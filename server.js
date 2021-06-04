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

let raster = new L.TileLayer(rasterUrl, {
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
    marker.addTo(map);
  } else {
    marker.setLatLng(latLon);
  }

  map.setView(latLon);
});

window.addEventListener("resize", function () {
  mly.resize();
});

var imageUrl = "http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg",
  imageBounds = [
    [40.712216, -74.22655],
    [40.773941, -74.12544],
  ];
L.imageOverlay(imageUrl, imageBounds).addTo(map);

// var mlyVectorLayerConfig = {
//   url: "https://tiles3.mapillary.com/v0.1/{z}/{x}/{y}.mvt",
//   maxZoom: 14,
//   style: function (feature) {
//     var style = {};
//     style.color = "rgba(53,175,109,0.7)";
//     style.size = 3;

//     return style;
//   },
// };

// var mvtSource = new L.TileLayer.mvtSource(mlyVectorLayerConfig);
// map.addLayer(mvtSource);
// import { Viewer } from "mapillary-js";

// const container = document.createElement("div");
// container.style.width = "400px";
// container.style.height = "300px";
// document.body.appendChild(container);

// const viewer = new Viewer({
//   apiClient: "V0hwanhNa3BrWjFzS0Yxb0JXRnhoZDozOTcxYTQ3MDUzODY3MWE4",
//   container: container,
//   imageId: "Pz9D6VLi2oumer6jfcmgMw",
// });
// console.log(viewer);
