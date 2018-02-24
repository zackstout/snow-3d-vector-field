
var THREE = require('three');
var OrbitControls = require('three-orbit-controls')(THREE);

var size = 2;
var num = 15;
var color2 = new THREE.Color("rgb(0, 0, 255)");
var material2 = new THREE.MeshLambertMaterial( { color: color2 } );
var pos = new THREE.Vector3();


var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xB0E0E6 );
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Generate initial box:
var geometry = new THREE.BoxGeometry( size, size, size );
var cube = new THREE.Mesh( geometry, material2 );
cube.receiveShadow = true;
cube.castShadow = true;
// scene.add( cube );


for (var i=0; i < num; i++) {
  for (var j=0; j < num; j++) {
    for (var k=0; k < num; k++) {
      var inc = 500 / num;
      pos.set(i * inc, j * inc, k * inc);
      var geom = new THREE.SphereGeometry( inc / 15 );
      var sphere = new THREE.Mesh( geom, material2 );
      sphere.position.copy(pos);

      //oh how strange, these are entirely necessary: (or at least one is)
      sphere.receiveShadow = true;
      sphere.castShadow = true;
      scene.add(sphere);
    }
  }
}

camera.position.x = 5 + size;

var controls = new OrbitControls( camera );
controls.target.set( 0, 2, 0 );
controls.update();

var light = new THREE.PointLight(0xffffff);
// Ok guess we just had to bring the light closer:
light.position.set(size * 1.5, size * 1.5, size * 1.5);
scene.add(light);

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );

}

animate();
