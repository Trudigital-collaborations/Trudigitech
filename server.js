var map = L.map("map").setView([32.56841, 0.33537], 15);

var osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
var rasterUrl = "https://raster-tiles.mapillary.com/v0.1/{z}/{x}/{y}.png";
// var mapillaryUrl =
//   "https://a.mapillary.com/v3/images?client_id=V0hwanhNa3BrWjFzS0Yxb0JXRnhoZDozOTcxYTQ3MDUzODY3MWE4&closeto=32.56841,0.33537&radius=200";
var osmAttrib =
  'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors,<a href="https://a.mapillary.com/v3/Mapillary';
var osm = new L.TileLayer(osmUrl, {
  maxZoom: 18,
  attribution: osmAttrib,
});
map.addLayer(osm);

var raster = new L.TileLayer(rasterUrl, {
  maxZoom: 18,
}).addTo(map);

var mly = new Mapillary.Viewer({
  apiClient: "V0hwanhNa3BrWjFzS0Yxb0JXRnhoZDozOTcxYTQ3MDUzODY3MWE4",
  container: "mly",
  imageKey: "Pz9D6VLi2oumer6jfcmgMw",
});

var marker;
mly.on(Mapillary.Viewer.nodechanged, function (node) {
  var latLon = [node.latLon.lat, node.latLon.lon];

  if (!marker) {
    marker = L.marker(latLon);
    marker.bindPopup("<b>Welcome to MUK!!👋<b>").openPopup();
    marker.addTo(map);
  } else {
    marker.setLatLng(latLon);
  }

  map.setView(latLon);
});

// layer control
var baseMaps = {
  raster: raster,
  mapillary: mly,
};

var overlayMaps = {
  marker: marker,
};

L.control.layers(baseMaps, overlayMaps).addTo(map);

window.addEventListener("resize", function () {
  mly.resize();
});
