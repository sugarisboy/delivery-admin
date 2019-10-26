import React, {Component} from 'react'
import { get, patch } from '../../service/api'
import Button from '@material-ui/core/Button'

class ShopMap extends Component {


    constructor(props, context) {
        super(props, context)
        this.points = []
    }

    async componentDidMount() {
        const {id} = this.props
        const resp = await get(`/map/region/shop/${id}`)
        const regionData = resp.data

        console.log(regionData.points)

        const hereMapData = this.normalizeRegionData(regionData)
        this.points = hereMapData
        console.log(this.points)
        this.drawMap(hereMapData)
    }

    /**
     * abscissa is latitude
     * ordinate is longtitude
     * @param regionData
     * @returns {[]}
     */
    normalizeRegionData(regionData) {
        const {abscissa, ordinate} = regionData
        if (abscissa.length !== ordinate.length) {
            return null
        }

        const points = []
        const pointsCount = abscissa.length
        for (let i = 0; i < pointsCount; i++) {
            points.push(abscissa[i])
            points.push(ordinate[i])
            points.push(0)
        }
        return points
    }

    drawMap(points) {
        const {H} = window
        const {map, geo} = H

        // const startLat = 3.146727
        // const startLng = 101.693620
        const startLat = 4.6335
        const startLng = 101.1638
        const startZoom = 12

        const polygonStyle = {
            fillColor: 'rgba(0, 0, 100, .5)',
            lineWidth: 0
        }

        // const points = [
        //     [3.164215, 101.692480, 0],
        //     [3.150632, 101.710496, 0],
        //     [3.127994, 101.706406, 0],
        //     [3.116334, 101.679469, 0],
        //     [3.106543, 101.656180, 0],
        //     [3.137382, 101.666544, 0],
        //     [3.147929, 101.668939, 0]
        // ]

        const svgCircle = '<svg width="20" height="20" version="1.1" xmlns="http://www.w3.org/2000/svg">'
            + '<circle cx="10" cy="10" r="7" fill="transparent" stroke="red" stroke-width="4"/>'
            + '</svg>'

        const verticeGroup = new map.Group({ visibility: true })
        const polygon = new map.Polygon(
            new geo.Polygon(new geo.LineString(points.flat(1))),
            {style: polygonStyle}
        )
        polygon.draggable = true
        polygon.getGeometry().getExterior().eachLatLngAlt((lat, lng, alt, index) => {
            const vertice = new map.Marker(
                {lat, lng},
                {
                    icon: new map.Icon(svgCircle, {
                        anchor: {x: 10, y: 10}
                    })
                }
            )
            vertice.draggable = true
            vertice.setData({'verticeIndex': index})
            verticeGroup.addObject(vertice)
        })

        const mainGroup = new map.Group({
            volatility: true,
            objects: [polygon, verticeGroup]
        })

        const platform = new H.service.Platform({
            app_id: 'PwhAzeVFHuSMGdcjtFvQ',
            app_code: 'yE6QWws10hfiJKPyLE-hIQ'
        })
        const layer = platform.createDefaultLayers()

        const shopMap = new H.Map(
            document.getElementById('map'),
            layer.normal.map,
            {
                zoom: startZoom,
                pixelRatio: window.devicePixelRatio || 1,
                center: {
                    lat: startLat,
                    lng: startLng
                }
            }
        )

        const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(shopMap))

        // H.ui.UI.createDefault(map, layer, 'en-US')
        shopMap.addObject(mainGroup)

        verticeGroup.addEventListener('drag', function(evt) {
            const pointer = evt.currentPointer
            const geoLineString = polygon.getGeometry().getExterior()
            const geoPoint = shopMap.screenToGeo(pointer.viewportX, pointer.viewportY)

            // set new position for vertice marker
            evt.target.setGeometry(geoPoint)

            // set new position for polygon's vertice
            geoLineString.removePoint(evt.target.getData()['verticeIndex'])
            geoLineString.insertPoint(evt.target.getData()['verticeIndex'], geoPoint)

            polygon.setGeometry(new H.geo.Polygon(geoLineString))

            // stop propagating the drag event, so the map doesn't move
            evt.stopPropagation()

            this.points = polygon.getGeometry().getExterior().getLatLngAltArray()
            console.log(this.points)
        }, true)
    }

    save = async () => {
        const shopId = this.props.id
        const {points} = this

        console.log(points)
        const resp = await patch('/map/regionupdate', {
            shopId,
            points
        })

        console.log(resp.data)
    }

    render() {
        return (
            <div>
                <h2>Map</h2>
                <Button color="primary"
                        variant="contained"
                        onClick={this.save}
                >
                    Save
                </Button>
                <div id="map" style={{
                    width: '100%',
                    height: '600px'
                }}/>
            </div>
        )
    }
}

export default ShopMap