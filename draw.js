
var THREE = require('three');
var OrbitControls = require('three-orbit-controls')(THREE);
var p5 = require('./p5.js');
// window.p5 = p5;

var size = 2;
var num = 15;
var allSpheres = [];
var color2 = new THREE.Color("rgb(0, 0, 255)");
var material2 = new THREE.MeshLambertMaterial( { color: color2 } );
var pos = new THREE.Vector3();

var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xB0E0E6 );
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
var scale = 0.1;
var inc = 500 / num;

var newp5 = new p5(function(sketch) {

  sketch.setup = function() {
    console.log('we in');

    // Generate grid of spheres:
    for (var i=0; i < num; i++) {
      for (var j=0; j < num; j++) {
        for (var k=0; k < num; k++) {
          pos.set(i * inc, j * inc, k * inc);

          // this is frustrating that i'm having trouble combining p5 and browserify:
          var noiseVal = sketch.noise(scale * i * inc / num, scale * j * inc / num, scale * k * inc / num);
          var noiseVal2 = sketch.noise(1 + scale * i * inc / num, -1 + scale * j * inc / num, 1 + scale * k * inc / num);

          var geom = new THREE.BoxGeometry( inc/ 15, inc/ 15, inc / 2);
          // var geom = new THREE.SphereGeometry( inc / 15 );
          var sphere = new THREE.Mesh( geom, material2 );

          sphere.position.copy(pos);
          sphere.noiseValue = noiseVal;
          sphere.noiseValue2 = noiseVal2;
          sphere.rotation.x = noiseVal * 2 * Math.PI;
          sphere.rotation.z = noiseVal2 * 2 * Math.PI;



          //oh how strange, these are entirely necessary: (or at least one is)
          sphere.receiveShadow = true;
          sphere.castShadow = true;
          scene.add(sphere);

          allSpheres.push(sphere);
        }
      }
    }

    console.log(allSpheres);

    camera.position.x = 5 + size;

    var controls = new OrbitControls( camera );
    controls.target.set( 0, 2, 0 );
    controls.update();

    var light = new THREE.PointLight(0xffffff);
    // Ok guess we just had to bring the light closer:
    light.position.set(size * 1.5, size * 1.5, size * 1.5);
    scene.add(light);

  };


}, 'dom-elem');



function animate() {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );

}

animate();
