import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { RouteWaypoint, TrekkingRoute, getRouteForTour } from '../data/trekkingRoutes';
import {
  Compass, Mountain, Layers, Maximize2, Minimize2, MapPin,
  TrendingUp, Flag, Award, Eye, Download, Navigation, Shield
} from 'lucide-react';

interface InteractiveRouteMapProps {
  tourId: string;
  tourSlug?: string;
  tourTitle?: string;
}

type TileLayerType = 'topo' | 'osm' | 'satellite';

export const InteractiveRouteMap: React.FC<InteractiveRouteMapProps> = ({
  tourId,
  tourSlug,
  tourTitle
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  const currentTileLayerRef = useRef<L.TileLayer | null>(null);

  const routeData: TrekkingRoute = getRouteForTour(tourId, tourSlug);

  const [activeLayer, setActiveLayer] = useState<TileLayerType>('topo');
  const [selectedWaypoint, setSelectedWaypoint] = useState<RouteWaypoint | null>(routeData.waypoints[routeData.waypoints.length - 1] || null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showElevationProfile, setShowElevationProfile] = useState(true);

  // Tile layer providers
  const tileProviders = {
    topo: {
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      attribution: 'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap (CC-BY-SA)',
      maxZoom: 17
    },
    osm: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      maxZoom: 18
    }
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Fix default marker asset paths in webpack/vite
    delete ((L.Icon.Default.prototype as any)._getIconUrl);
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });

    // Cleanup previous instance if exists
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Create map instance
    const map = L.map(mapContainerRef.current, {
      center: routeData.waypoints[Math.floor(routeData.waypoints.length / 2)]
        ? [routeData.waypoints[Math.floor(routeData.waypoints.length / 2)].lat, routeData.waypoints[Math.floor(routeData.waypoints.length / 2)].lng]
        : [35.7333, 76.5167],
      zoom: 9,
      zoomControl: true,
      scrollWheelZoom: false
    });

    mapInstanceRef.current = map;

    // Add selected Tile Layer
    const tileConf = tileProviders[activeLayer];
    const initialTileLayer = L.tileLayer(tileConf.url, {
      attribution: tileConf.attribution,
      maxZoom: tileConf.maxZoom
    }).addTo(map);

    currentTileLayerRef.current = initialTileLayer;

    // Layer Group for markers & routes
    const layerGroup = L.layerGroup().addTo(map);
    layerGroupRef.current = layerGroup;

    // Draw route path polyline
    const polyline = L.polyline(routeData.pathCoordinates, {
      color: '#5191fa',
      weight: 4,
      opacity: 0.9,
      dashArray: '8, 8',
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(layerGroup);

    // Add casing line for shadow & contrast
    L.polyline(routeData.pathCoordinates, {
      color: '#1a2b48',
      weight: 7,
      opacity: 0.4,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(layerGroup);

    // Add Waypoint markers
    routeData.waypoints.forEach((wp, index) => {
      // Create custom HTML icon
      const isStart = index === 0;
      const isFinish = index === routeData.waypoints.length - 1;
      const isBasecamp = wp.type === 'basecamp' || wp.type === 'summit' || wp.type === 'pass';

      let bgClass = 'bg-[#1a2b48]';
      let borderClass = 'border-white';
      let symbol = `${wp.altitude}m`;

      if (isStart) {
        bgClass = 'bg-emerald-600';
        symbol = 'START';
      } else if (isFinish || isBasecamp) {
        bgClass = 'bg-[#fa5636] animate-pulse';
        symbol = wp.type === 'summit' ? '▲ PEAK' : '▲ CAMP';
      } else if (wp.type === 'glacier') {
        bgClass = 'bg-[#5191fa]';
      }

      const customIcon = L.divIcon({
        className: 'custom-wp-pin',
        html: `
          <div style="
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: ${isStart ? '#10b981' : isFinish || isBasecamp ? '#fa5636' : wp.type === 'glacier' ? '#5191fa' : '#1a2b48'};
            color: #ffffff;
            font-size: 10px;
            font-weight: 700;
            padding: 3px 6px;
            border-radius: 9999px;
            border: 2px solid #ffffff;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            white-space: nowrap;
            transform: translate(-50%, -50%);
            cursor: pointer;
          ">
            <span>${wp.name.split(' ')[0]}</span>
            <span style="opacity: 0.85; margin-left: 3px; font-size: 8px;">(${wp.altitude}m)</span>
          </div>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      const marker = L.marker([wp.lat, wp.lng], { icon: customIcon });

      // Popup content
      const popupContent = `
        <div style="font-family: 'Poppins', sans-serif; padding: 4px; max-width: 240px; color: #1a2b48;">
          <div style="font-size: 10px; text-transform: uppercase; font-weight: 700; color: #5191fa; letter-spacing: 0.5px;">
            ${wp.dayNumber ? `Day ${wp.dayNumber} · ` : ''}${wp.type.toUpperCase()}
          </div>
          <div style="font-size: 14px; font-weight: 700; margin: 2px 0 4px 0; color: #1a2b48;">
            ${wp.name}
          </div>
          <div style="display: inline-block; background: #eef4ff; color: #1e40af; font-size: 11px; font-weight: 600; padding: 2px 6px; border-radius: 4px; margin-bottom: 6px;">
            Elevation: ${wp.altitude.toLocaleString()} m / ${Math.round(wp.altitude * 3.28084).toLocaleString()} ft
          </div>
          <div style="font-size: 11px; color: #5e6d77; line-height: 1.4;">
            ${wp.description}
          </div>
          ${wp.terrain ? `<div style="font-size: 10px; color: #94a3b8; margin-top: 4px;">Terrain: ${wp.terrain}</div>` : ''}
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on('click', () => {
        setSelectedWaypoint(wp);
      });

      marker.addTo(layerGroup);
    });

    // Fit map bounds to show entire route with padding
    map.fitBounds(polyline.getBounds(), { padding: [40, 40] });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [tourId, tourSlug]);

  // Handle Layer Switch
  const handleLayerChange = (layer: TileLayerType) => {
    setActiveLayer(layer);
    if (!mapInstanceRef.current || !currentTileLayerRef.current) return;

    mapInstanceRef.current.removeLayer(currentTileLayerRef.current);
    const tileConf = tileProviders[layer];
    const newLayer = L.tileLayer(tileConf.url, {
      attribution: tileConf.attribution,
      maxZoom: tileConf.maxZoom
    }).addTo(mapInstanceRef.current);

    currentTileLayerRef.current = newLayer;
  };

  // Pan to waypoint
  const handleFlyToWaypoint = (wp: RouteWaypoint) => {
    setSelectedWaypoint(wp);
    if (!mapInstanceRef.current) return;

    mapInstanceRef.current.flyTo([wp.lat, wp.lng], 12, {
      animate: true,
      duration: 1.2
    });
  };

  // Reset to full route bounds
  const handleResetBounds = () => {
    if (!mapInstanceRef.current) return;
    const bounds = L.latLngBounds(routeData.pathCoordinates);
    mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40] });
  };

  // Download simulated GPX file
  const handleDownloadGpx = () => {
    const gpxContent = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Diran Peak Adventure - Karakoram Expeditions" xmlns="http://www.topografix.com/GPX/1/1">
  <metadata>
    <name>${routeData.title}</name>
    <desc>${routeData.summary}</desc>
  </metadata>
  <trk>
    <name>${routeData.title}</name>
    <trkseg>
      ${routeData.pathCoordinates.map(([lat, lng]) => `<trkpt lat="${lat}" lon="${lng}"></trkpt>`).join('\n      ')}
    </trkseg>
  </trk>
</gpx>`;

    const blob = new Blob([gpxContent], { type: 'application/gpx+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tourId}-karakoram-route.gpx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`bg-white rounded-xl border border-[#eaeef3] overflow-hidden shadow-xs transition-all ${
      isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'my-8'
    }`}>
      {/* Top Header Bar */}
      <div className="p-4 sm:p-5 bg-white border-b border-[#eaeef3] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#5191fa] uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4 text-[#5191fa]" />
            <span>Interactive GPS Expedition Route &amp; Topography</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#1a2b48]">
            {routeData.title}
          </h3>
          <p className="text-xs text-[#5e6d77] mt-0.5">
            Explore campsite coordinates, high passes, and glacial waypoints mapped by our senior Balti guides.
          </p>
        </div>

        {/* Map Control Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Layer switcher */}
          <div className="inline-flex rounded-lg border border-[#dfdfdf] p-0.5 bg-slate-50 text-xs">
            <button
              onClick={() => handleLayerChange('topo')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                activeLayer === 'topo'
                  ? 'bg-[#1a2b48] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Topographic contours & terrain"
            >
              🏔️ Topo Terrain
            </button>
            <button
              onClick={() => handleLayerChange('osm')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                activeLayer === 'osm'
                  ? 'bg-[#1a2b48] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Standard street and trail map"
            >
              🗺️ Standard
            </button>
            <button
              onClick={() => handleLayerChange('satellite')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                activeLayer === 'satellite'
                  ? 'bg-[#1a2b48] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Satellite imagery of glaciers & peaks"
            >
              🛰️ Satellite
            </button>
          </div>

          {/* Reset bounds */}
          <button
            onClick={handleResetBounds}
            className="p-2 border border-[#dfdfdf] hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1"
            title="Reset map view to whole route"
          >
            <Navigation className="w-3.5 h-3.5 text-[#5191fa]" />
            <span className="hidden sm:inline">Fit Route</span>
          </button>

          {/* Download GPX */}
          <button
            onClick={handleDownloadGpx}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1"
            title="Download GPX route for Garmin / handheld GPS"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GPX Track</span>
          </button>

          {/* Fullscreen toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 border border-[#dfdfdf] hover:bg-slate-50 text-slate-700 rounded-lg text-xs transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Map'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 4 Metric Stats Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 bg-[#f8fafc] border-b border-[#eaeef3] text-xs">
        <div className="p-3 sm:p-4 border-r border-[#eaeef3] flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#5191fa] flex items-center justify-center shrink-0">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Total Distance</div>
            <div className="text-sm font-bold text-[#1a2b48]">~{routeData.distanceKm} km</div>
          </div>
        </div>

        <div className="p-3 sm:p-4 border-r border-[#eaeef3] flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <Mountain className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Max Elevation</div>
            <div className="text-sm font-bold text-[#1a2b48]">{routeData.maxAltitudeM.toLocaleString()} m</div>
          </div>
        </div>

        <div className="p-3 sm:p-4 border-r border-[#eaeef3] flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Altitude Gain</div>
            <div className="text-sm font-bold text-[#1a2b48]">+{routeData.elevationGainM.toLocaleString()} m</div>
          </div>
        </div>

        <div className="p-3 sm:p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Glacier Terrain</div>
            <div className="text-sm font-bold text-[#1a2b48]">{routeData.daysOnGlacier} Days on Ice</div>
          </div>
        </div>
      </div>

      {/* Main Map Box & Side Inspector */}
      <div className="relative">
        {/* Leaflet Canvas */}
        <div
          ref={mapContainerRef}
          className={`w-full bg-slate-100 ${isFullscreen ? 'h-[calc(100vh-240px)]' : 'h-[440px] sm:h-[500px]'}`}
        />

        {/* Selected Waypoint Overlay Card */}
        {selectedWaypoint && (
          <div className="absolute top-4 left-4 z-20 max-w-xs sm:max-w-sm bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-slate-200 animate-in fade-in slide-in-from-left duration-200">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#5191fa] bg-blue-50 px-2 py-0.5 rounded">
                  {selectedWaypoint.dayNumber ? `Day ${selectedWaypoint.dayNumber} Stage` : selectedWaypoint.type.toUpperCase()}
                </span>
                <h4 className="text-base font-bold text-[#1a2b48] mt-1">
                  {selectedWaypoint.name}
                </h4>
              </div>
              <div className="text-right shrink-0">
                <div className="text-sm font-extrabold text-[#1a2b48]">
                  {selectedWaypoint.altitude.toLocaleString()} m
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {Math.round(selectedWaypoint.altitude * 3.28084).toLocaleString()} ft
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mt-2">
              {selectedWaypoint.description}
            </p>

            {selectedWaypoint.highlight && (
              <div className="mt-2 text-[11px] text-amber-800 bg-amber-50 p-1.5 rounded-lg border border-amber-200 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span className="font-semibold">{selectedWaypoint.highlight}</span>
              </div>
            )}

            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span className="font-mono">{selectedWaypoint.lat.toFixed(4)}° N, {selectedWaypoint.lng.toFixed(4)}° E</span>
              <button
                onClick={() => handleFlyToWaypoint(selectedWaypoint)}
                className="text-[#5191fa] hover:underline font-semibold flex items-center gap-0.5 cursor-pointer"
              >
                <span>Center</span>
                <Eye className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Horizontal Waypoint Stepper Navigator */}
      <div className="p-4 bg-white border-t border-[#eaeef3]">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-bold uppercase text-[#1a2b48] tracking-wider flex items-center gap-1.5">
            <Flag className="w-3.5 h-3.5 text-[#5191fa]" />
            <span>Click Waypoint to Pan Map</span>
          </div>
          <button
            onClick={() => setShowElevationProfile(!showElevationProfile)}
            className="text-xs text-[#5191fa] hover:underline font-medium cursor-pointer"
          >
            {showElevationProfile ? 'Hide Elevation Profile' : 'Show Elevation Profile'}
          </button>
        </div>

        {/* Scrollable Waypoint Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {routeData.waypoints.map((wp, index) => {
            const isSelected = selectedWaypoint?.id === wp.id;
            return (
              <button
                key={wp.id}
                onClick={() => handleFlyToWaypoint(wp)}
                className={`shrink-0 px-3 py-2 rounded-xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1a2b48] text-white border-[#1a2b48] shadow-md'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isSelected ? 'bg-[#5191fa] text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {index + 1}
                  </span>
                  <span className="font-semibold text-xs whitespace-nowrap">{wp.name}</span>
                </div>
                <div className={`text-[10px] mt-0.5 pl-6 font-mono ${
                  isSelected ? 'text-blue-200' : 'text-slate-400'
                }`}>
                  {wp.altitude}m {wp.dayNumber ? `· Day ${wp.dayNumber}` : ''}
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Elevation Chart SVG */}
        {showElevationProfile && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="text-[11px] font-semibold text-slate-500 mb-2 flex items-center justify-between">
              <span>Trail Elevation Profile (Skardu to High Camps)</span>
              <span className="text-[10px] text-slate-400">Hover nodes to view altitude</span>
            </div>

            <div className="relative h-24 w-full bg-slate-50 rounded-xl p-2 border border-slate-200/80">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 800 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="altitudeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#5191fa" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#5191fa" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Draw gradient area */}
                {(() => {
                  const points = routeData.waypoints.map((wp, i) => {
                    const x = (i / (routeData.waypoints.length - 1)) * 760 + 20;
                    // Scale from 1000m to 6000m (or route max altitude)
                    const minAlt = 1000;
                    const maxAlt = Math.max(routeData.maxAltitudeM + 300, 6000);
                    const y = 90 - ((wp.altitude - minAlt) / (maxAlt - minAlt)) * 80;
                    return { x, y, wp };
                  });

                  const pathD = `M ${points[0].x} 95 ` +
                    points.map(p => `L ${p.x} ${p.y}`).join(' ') +
                    ` L ${points[points.length - 1].x} 95 Z`;

                  const strokeD = `M ` + points.map(p => `${p.x} ${p.y}`).join(' L ');

                  return (
                    <>
                      <path d={pathD} fill="url(#altitudeGradient)" />
                      <path d={strokeD} fill="none" stroke="#5191fa" strokeWidth="2.5" strokeLinecap="round" />
                      {points.map((p, i) => (
                        <circle
                          key={i}
                          cx={p.x}
                          cy={p.y}
                          r={selectedWaypoint?.id === p.wp.id ? 5 : 3}
                          fill={selectedWaypoint?.id === p.wp.id ? '#fa5636' : '#1a2b48'}
                          stroke="#ffffff"
                          strokeWidth="1.5"
                          className="cursor-pointer transition-all hover:r-6"
                          onClick={() => handleFlyToWaypoint(p.wp)}
                        />
                      ))}
                    </>
                  );
                })()}
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
