//difererent shaders
var pass_prog;
var backStep_prog;


var ext = null;
var isExt;

function initializeShader() {

    //for extension 
    ext = gl.getExtension("WEBGL_draw_buffers");

    if (!ext)
	{
        alert("Buffer Extension has assploded.");
        isExt = false;
    } else 
	{
        alert("Buffer Extension is working fine.");
        isExt = true;
    }


        //First shader, writes things back to the buffer.
        var vs = getShaderSource(document.getElementById("pass_vs"));
        var fs = getShaderSource(document.getElementById("pass_fs"));

        pass_prog = createProgram(gl, vs, fs, message);    

        if (!gl.getProgramParameter(pass_prog, gl.LINK_STATUS)) {
            alert("Could not initialise pass_fs");
        }

        positionLocation = gl.getAttribLocation(pass_prog, "Position");
        normalLocation = gl.getAttribLocation(pass_prog, "Normal");
        texCoordLocation = gl.getAttribLocation(pass_prog, "Texcoord");       
        u_textureLocation = gl.getUniformLocation(pass_prog, "u_Texutre");
        u_ModelLocation = gl.getUniformLocation(pass_prog,"u_Model");
        u_ViewLocation = gl.getUniformLocation(pass_prog,"u_View");
        u_PerspLocation = gl.getUniformLocation(pass_prog,"u_Persp");
        u_InvTransLocation = gl.getUniformLocation(pass_prog,"u_InvTrans");
        u_ColorSamplerLocation = gl.getUniformLocation(pass_prog,"u_ColorSampler");
    

    //Second shaders
    vs = getShaderSource(document.getElementById("backStep_vs"));
    fs = getShaderSource(document.getElementById("backStep_fs"));

    backStep_prog = createProgram(gl, vs, fs, message);
	if (!gl.getProgramParameter(diagnostic_prog, gl.LINK_STATUS)) {
        alert("Could not initialise backStep_fs");
    }
	
    gl.bindAttribLocation(ambient_prog, quad_positionLocation, "Position");
    gl.bindAttribLocation(ambient_prog, quad_texCoordLocation, "Texcoord");

    
    ambientLocs.push(gl.getUniformLocation(ambient_prog, "u_DisplayType"));
    ambientLocs.push(gl.getUniformLocation(ambient_prog, "u_Near"));
    ambientLocs.push(gl.getUniformLocation(ambient_prog, "u_Far"));
    ambientLocs.push(gl.getUniformLocation(ambient_prog, "u_Width"));
    ambientLocs.push(gl.getUniformLocation(ambient_prog, "u_Height"));
    ambientLocs.push(gl.getUniformLocation(ambient_prog, "u_Depthtex"));
    ambientLocs.push(gl.getUniformLocation(ambient_prog, "u_Normaltex"));
    ambientLocs.push(gl.getUniformLocation(ambient_prog, "u_Positiontex"));
    ambientLocs.push(gl.getUniformLocation(ambient_prog, "u_Colortex"));

    ambientLoc_Light = gl.getUniformLocation(ambient_prog,"u_Light");
}


//Alright, these are the four textures that we need for the backstep proceses.
//We're naturally going to have a bunch more textures when we start loading stuff up for images.
var depthTexture = gl.createTexture();
var normalTexture = gl.createTexture();
var positionTexture = gl.createTexture();
var colorTexture = gl.createTexture();
var depthRGBTexture = gl.createTexture();


var FBO = [];

var rttFramebuffers = []; //Talisman: I have no idea what this does, so I'm not deleting it.
//I feel like the worlds worst surgeon write now. "Oh, well, I don't what that is, I suppose I'm not going to cut it."

function initializeFBO() {

    console.log("initFBO");
    gl.getExtension("OES_texture_float");
    gl.getExtension("OES_texture_float_linear");
    var extDepth = gl.getExtension("WEBGL_depth_texture");

    if(!extDepth){
        console.log("Extension Depth texture is not working");
        alert("OH GOD, THE DEPTH TEXTURE EXTENSION CAUGHT FIRE. ABORT ABORT ABORT.");
        return;
    }


    //Geometry Frame Buffer | Alright We Need This//
    gl.bindTexture(gl.TEXTURE_2D, depthTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, canvas.width, canvas.height, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);


    gl.bindTexture(gl.TEXTURE_2D, normalTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, canvas.width, canvas.height, 0, gl.RGBA, gl.FLOAT, null);


    gl.bindTexture(gl.TEXTURE_2D, positionTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, canvas.width, canvas.height, 0, gl.RGBA, gl.FLOAT, null);


    gl.bindTexture(gl.TEXTURE_2D, colorTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, canvas.width, canvas.height, 0, gl.RGBA, gl.FLOAT, null);


    gl.bindTexture(gl.TEXTURE_2D, depthRGBTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, canvas.width, canvas.height, 0, gl.RGBA, gl.FLOAT, null);

    if(ext)//Draw buffer is supported
    {
        FBO[0] = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, FBO[0]);
        var bufs = [];
        bufs[0] = ext.COLOR_ATTACHMENT0_WEBGL;
        bufs[1] = ext.COLOR_ATTACHMENT1_WEBGL;
        bufs[2] = ext.COLOR_ATTACHMENT2_WEBGL;
        bufs[3] = ext.COLOR_ATTACHMENT3_WEBGL;
        ext.drawBuffersWEBGL(bufs);
		
			//Alright, this is the order of the buffers.
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, depthTexture, 0); 
        gl.framebufferTexture2D(gl.FRAMEBUFFER, bufs[0], gl.TEXTURE_2D, depthRGBTexture, 0);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, bufs[1], gl.TEXTURE_2D, normalTexture, 0);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, bufs[2], gl.TEXTURE_2D, positionTexture, 0);    
        gl.framebufferTexture2D(gl.FRAMEBUFFER, bufs[3], gl.TEXTURE_2D, colorTexture, 0);    


        var FBOstatus = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
        if(FBOstatus != gl.FRAMEBUFFER_COMPLETE) {
    	    alert("GL_FRAMEBUFFER_COMPLETE failed, CANNOT use FBO[0]. Everything is going to explode now.");        	
        }    	
    }
    else//Draw buffer is NOT supported
    {
        alert("We don't have a draw buffer working, so don't even think about this.")
    }

    gl.clear(gl.DEPTH_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); //Alright we have the standar clear section in here.
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.bindTexture(gl.TEXTURE_2D, null);
}




//OBJ
var meshes = [];    
var models = [];


function setmodelMatrix() //I honestly don't know what this does.
{
    for(var i = 0; i < 1; ++i){
    	for(var j = 0; j < 1; ++j){
            for(var k = 0; k < 1; ++k){ //These are the weirdest loops I've seen in ages.
        		var matrix = mat4.create();
        		mat4.identity(matrix);
        		//mat4.scale(matrix,[1,1,1]);
        		mat4.translate(matrix,[i*2,j*2,k*2]);       
        		models.push(matrix);
            }
    	}
    }
}


var meshVertices = [];//new Float32Array();
var meshNormals = [];//new Float32Array();
var meshIndex = [];//new Uint16Array();
var meshUV = [];

//Begin block of things that I'm not sure what they all do
//ADD
var meshisFrontFace = [];
var meshedges = []; // store edge vertex indices 3,5 // connect vertex 3 and vertex 5
var meshedgefaces = []; //stroe each edge's face list  1,3 // connect face 1 and face 3
var meshfacenormals = [];

var bufferVertices = [];
var bufferIndex = [];

var vertexBuffer;
var normalBuffer;
var indexBuffer;

var vBuffers = [];
var nBuffers = [];
var iBuffers = [];


//ADD
var iLens = [];

var silEdgeMeshes;
var silEdgeMeshesvbo;
var silEdgeMeshesibo;
var silEdgeMeshescbo = [];



var bufferVertices = [];
var bufferIndex = [];
var bufferTexutre = [];

var vertexBuffer;
var normalBuffer;
var textureBuffer;
var indexBuffer;

var vBuffers = [];
var nBuffers = [];
var iBuffers = [];
var uBuffers = [];
var tBuffers = [];

var iLens = [];

var meshNum = 0;

var meshTextures = [];
//End block of things that I'm not sure what they do.


for(var i = 0; i < 38; i++){ //DAMN YOU MAGIC NUMBERS
    var meshTex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, meshTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 0, 0, 255])); 
    meshTextures.push(meshTex); //Interesting, so we're creating an image of... Fully Opaque Red?
}


//texture loading code from http://learningwebgl.com/blog/?p=507
// Okay. This is a fascinating image call. We're actually pilling web images. We don't need this,
// so, it's slated for deletion. 
//AH. The red was a debug color. Duh.
function initTexture(url, index) {
    // var meshTex = gl.createTexture();
    meshTextures[index].image = new Image();
    meshTextures[index].image.onload = function() {
        handleLoadedTexture(meshTextures[index]);
    }

    meshTextures[index].image.src = url;

    //meshTextures.push(meshTex);
}
//Further load functions. Will be obsolete soon.
function handleLoadedTexture(texture) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);//gl.REPEAT
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.bindTexture(gl.TEXTURE_2D, null);
}

// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}



function initMeshBuffers()
{
    setmodelMatrix();

    //var loader = new THREE.OBJLoader();
    var loader = new THREE.OBJMTLLoader();

    //ADD
    hashedges = {};
    var edgeidx = 0;
    
    // var objurl = 'http://sijietian.com/WebGL/OBJ/sponza/sponza.obj';
    // var mtlurl = 'http://sijietian.com/WebGL/OBJ/sponza/sponza.mtl';

    // var objxhr = createCORSRequest('GET', objurl);
    // var mtlxhr = createCORSRequest('GET', mtlurl);

    // var url1;
    // if (!objxhr) {
    //     alert('CORS not supported');
    //     return;
    // }

    // objxhr.onload = function() {
    //     url1 = objxhr.responseText;
    //     console.log("fefefefefe"+url1);
    // }

    // objxhr.onerror = function() {
    //     alert('Woops, there was an error making the request.');
    // };

    // objxhr.send();
    //loader.load( 'http://sijietian.com/WebGL/OBJ/sponza/sponza.obj', 'http://sijietian.com/WebGL/OBJ/sponza/sponza.mtl', function ( event ) {
    //address for obj
    loader.load( 'http://127.0.0.1:8089/OBJ/sponza/sponza.obj', 'http://127.0.0.1:8089/OBJ/sponza/sponza.mtl', function ( event ) {
    // loader.load( 'http://localhost/deferredShader/sponza.obj', 'http://localhost/deferredShader/sponza.mtl', function ( event ) {
    //loader.load( 'http://127.0.0.1:8089/OBJ/sponza.obj', 'http://127.0.0.1:8089/OBJ/sponza.mtl', function ( event ) {
    //loader.load( objxhr.responseText, mtlxhr.responseText, function ( event ) {
    //loader.load( 'http://sijietian.com/WebGL/OBJ/sponza/sponza.obj', 'http://sijietian.com/WebGL/OBJ/sponza/sponza.mtl', function ( event ) {

    //loader.load( 'http://127.0.0.1:8089/OBJ/crytek-sponza/sponza.obj', 'http://127.0.0.1:8089/OBJ/crytek-sponza/sponza.mtl', function ( event ) {

    //loader.load( 'http://127.0.0.1:8089/OBJ/sibenik.obj', function ( event ) {
    //loader.load( 'http://127.0.0.1:8089/OBJ/sponza/sponza.obj', function ( event ) {
    //loader.load( 'http://127.0.0.1:8089/OBJ/dragon.obj', function ( event ) {
    //loader.load( 'http://sijietian.com/WebGL/OBJ/sibenik.obj', function ( event ) {
        var object = event;

        console.log("children " + object.children.length);

        var oldIndexNum = 0;
        var totalFace = 0;
        var totalVertices = 0;
        var point = 0;
        var url;
        object.traverse( function ( child ) {
        	if ( child instanceof THREE.Mesh ) {

        		var lenVertices = child.geometry.vertices.length;
        		var lenFaces = child.geometry.faces.length;
                var lenUV = child.geometry.faceVertexUvs[0].length;

                if(lenFaces != 0){       

                    // console.log ("Len Vertices " + lenVertices);
                    // console.log ("Len Faces " + lenFaces);
                    // console.log ("Len UV " + lenUV);
                   
                    if(child.material.map!=null)
                    {                                        
                        url = child.material.map.image.toDataURL("image/jpeg", 1.0);
                        //console.log("hell "+child.material.map.image);
                        //var url = child.material.map.image.src;
                        //var url =  "http://127.0.0.1:8089/OBJ/sponza/KAMEN.JPG";                        
                        initTexture(url, tBuffers.length);
                    }
                    else
                    {                             
                        initTexture(url, tBuffers.length);
                    }
                    

                    totalFace += lenFaces;
                    totalVertices += lenVertices;                

                    meshVertices = [];                    

            		for(var i = 0; i < lenVertices; i++)
                    {                    	
                        meshVertices.push(child.geometry.vertices[i].x);
                        meshVertices.push(child.geometry.vertices[i].y);
                        meshVertices.push(child.geometry.vertices[i].z);
                    }                              
                    
                    var UVs = child.geometry.faceVertexUvs[0];
                   
                    for(var i = 0; i < lenFaces; i++)
                    {
                    	var indexa = child.geometry.faces[i].a;
                    	var indexb = child.geometry.faces[i].b;
                    	var indexc = child.geometry.faces[i].c;                     

                    	bufferVertices.push(meshVertices[indexa*3]);
                    	bufferVertices.push(meshVertices[indexa*3+1]);
                    	bufferVertices.push(meshVertices[indexa*3+2]);

                    	bufferVertices.push(meshVertices[indexb*3]);
                    	bufferVertices.push(meshVertices[indexb*3+1]);
                    	bufferVertices.push(meshVertices[indexb*3+2]);

                    	bufferVertices.push(meshVertices[indexc*3]);
                    	bufferVertices.push(meshVertices[indexc*3+1]);
                    	bufferVertices.push(meshVertices[indexc*3+2]);    


                        minX = Math.min(minX, Math.min(meshVertices[indexa*3], Math.min(meshVertices[indexb*3], meshVertices[indexc*3])));
                        minY = Math.min(minY, Math.min(meshVertices[indexa*3+1], Math.min(meshVertices[indexb*3+1], meshVertices[indexc*3+2])));
                        minZ = Math.min(minZ, Math.min(meshVertices[indexa*3+2], Math.min(meshVertices[indexb*3+2], meshVertices[indexc*3+2])));

                        maxX = Math.max(maxX, Math.max(meshVertices[indexa*3], Math.max(meshVertices[indexb*3], meshVertices[indexc*3])));
                        maxY = Math.max(maxY, Math.max(meshVertices[indexa*3+1], Math.max(meshVertices[indexb*3+1], meshVertices[indexc*3+2])));
                        maxZ = Math.max(maxZ, Math.max(meshVertices[indexa*3+2], Math.max(meshVertices[indexb*3+2], meshVertices[indexc*3+2])));


                        
                        var uv = UVs[i];
                        for(var j = 0; j < uv.length; j++)
                        {
                            meshUV.push(uv[j].x);
                            meshUV.push(1.0-uv[j].y);
                        }
                       

                    	meshfacenormals.push(child.geometry.faces[i].normal.x);
                    	meshfacenormals.push(child.geometry.faces[i].normal.y);
                    	meshfacenormals.push(child.geometry.faces[i].normal.z);
                     

                    	for(var j = 0; j < 3; j++){                                              
                    		meshNormals.push(child.geometry.faces[i].normal.x);
                    		meshNormals.push(child.geometry.faces[i].normal.y);
                    		meshNormals.push(child.geometry.faces[i].normal.z);
                    	}

                    	//ADD initialize front face buffer
                    	meshisFrontFace.push(0);
                    	// add to edge list
                    	var es = [];
                    	es.push([indexa,indexb]);
                    	es.push([indexb,indexc]);
                    	es.push([indexc,indexa]);


                    	for(var idx = 0; idx <3; idx ++)
                    	{
                    		var inverses = [es[idx][1],es[idx][0]];
                    		if(es[idx] in hashedges || inverses in hashedges)
                    		{
                    			//console.log(es[idx] + "  " + inverses);
                    			if(es[idx] in hashedges)
                    			{
                    				//console.log("exist " + packed.edgefaces[packed.hashedges[es[idx]]]);
                    				meshedgefaces[hashedges[es[idx]]].push(i);
                    			}
                    			else
                    			{
                    				//console.log("exist " + packed.edgefaces[packed.hashedges[inverses]]);
                    				meshedgefaces[hashedges[inverses]].push(i);
                    				//console.log(packed.hashedges[inverses] + " : "+ packed.edgefaces[packed.hashedges[inverses]]);
                    			}
                    			continue;
                    		}
                    		else
                    		{
                    			hashedges[es[idx]] = edgeidx;

                    			//console.log(packed.hashedges);
                    			meshedges.push(es[idx]);
                    			//console.log("edge : " + es[idx] + " edge idx: " + packed.hashedges[es[idx]]);                        
                    			meshedgefaces[edgeidx] = [];
                    			meshedgefaces[edgeidx].push(i);

                    			edgeidx ++;
                    		}
                    		//console.log(packed.edgefaces[1]);
                    	}

                    	meshIndex.push(point++);
                    	meshIndex.push(point++);
                    	meshIndex.push(point++);

                    	// if(meshIndex.length > 65000)
                    	// {
                    	// 	//console.log("meshIndex > 64000");
                    	// 	vertexBuffer = gl.createBuffer();
                    	// 	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
                    	// 	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bufferVertices), gl.STATIC_DRAW);
                    	// 	vertexBuffer.numItems = bufferVertices.length / 3;
                    	// 	vBuffers.push(vertexBuffer);

                    	// 	normalBuffer = gl.createBuffer();
                    	// 	gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
                    	// 	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(meshNormals), gl.STATIC_DRAW);
                    	// 	meshNormals.numItems = meshNormals.length / 3;
                    	// 	nBuffers.push(normalBuffer);

                     //        textureBuffer = gl.createBuffer();
                     //        gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
                     //        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(meshUV), gl.STATIC_DRAW);
                     //        meshUV.numItems = meshUV.length / 2;
                     //        tBuffers.push(textureBuffer);

                    	// 	indexBuffer = gl.createBuffer();
                    	// 	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);      
                    	// 	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(meshIndex), gl.STATIC_DRAW);  
                    	// 	indexBuffer.numItems = meshIndex.length;
                    	// 	iBuffers.push(indexBuffer);

                    	// 	//console.log("Index len " + meshIndex.length/3);
                    	// 	iLens.push(meshIndex.length);

                    	// 	point = 0;
                    	// 	bufferVertices = [];
                    	// 	meshNormals = [];
                    	// 	meshIndex = [];                     
                    	// }                        
                    } // end for face loop     

                    vertexBuffer = gl.createBuffer();
                    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
                    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bufferVertices), gl.STATIC_DRAW);
                    vertexBuffer.numItems = bufferVertices.length / 3;
                    vBuffers.push(vertexBuffer);


                    normalBuffer = gl.createBuffer();
                    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
                    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(meshNormals), gl.STATIC_DRAW);
                    meshNormals.numItems = meshNormals.length / 3;
                    nBuffers.push(normalBuffer);   

                    textureBuffer = gl.createBuffer();
                    gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
                    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(meshUV), gl.STATIC_DRAW);
                    meshUV.numItems = meshUV.length / 2;
                    tBuffers.push(textureBuffer);

                    // console.log("vertex len is " + vertexBuffer.numItems);
                    // console.log("UV len is " + meshUV.numItems);

                    indexBuffer = gl.createBuffer();
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);      
                    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(meshIndex), gl.STATIC_DRAW);  
                    indexBuffer.numItems = meshIndex.length;
                    iBuffers.push(indexBuffer);

                    point = 0;
                    bufferVertices = [];
                    meshNormals = [];
                    meshIndex = []; 
                    meshUV = [];

                }//end of if(lenFaces != 0)  
            }          

           
        } );
        
        // vertexBuffer = gl.createBuffer();
        // gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bufferVertices), gl.STATIC_DRAW);
        // vertexBuffer.numItems = bufferVertices.length / 3;
        // vBuffers.push(vertexBuffer);


        // normalBuffer = gl.createBuffer();
        // gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
        // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(meshNormals), gl.STATIC_DRAW);
        // meshNormals.numItems = meshNormals.length / 3;
        // nBuffers.push(normalBuffer);   

        // textureBuffer = gl.createBuffer();
        // gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
        // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(meshUV), gl.STATIC_DRAW);
        // meshUV.numItems = meshUV.length / 2;
        // tBuffers.push(textureBuffer);


        // indexBuffer = gl.createBuffer();
        // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);      
        // gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(meshIndex), gl.STATIC_DRAW);  
        // indexBuffer.numItems = meshIndex.length;
        // iBuffers.push(indexBuffer);

        //console.log("Index len " + meshIndex.length);
        iLens.push(meshIndex.length);

        console.log("number of draw calls " + vBuffers.length);

        console.log("total Faces " + totalFace);
        console.log("total Vertices " + totalVertices);

        //console.log("Index len " + meshIndex.length/3);
        // meshNum ++;   
        console.log("mehsnormals len " + meshNormals.length / 3);
        //updateFaceInfo(meshfacenormals,models[0],meshisFrontFace,meshedgefaces,meshedges,meshVertices);

        isLoadingComplete = true;
       // document.write("<div id= \"loading\"> <p> </p></div>");
        $("#loading p").text("");
        initLights();
        setUpLights();
        initLightsFBO(); 

        animate();

    });
    
} // end for initmesh function //Well, this can probably be killed soon. //: end of onkill function.


var numberOfIndices;
var positionsName;
var normalsName;
var texCoordsName;
var indicesName;

var device_quad = {num_indices:0};

var vbo_vertices;    var vbo_indices;
var vbo_textures;

function initializeQuad() 
{ //Alright, this one we keep since this becomes our write back location.
	var positions = new Float32Array([
			-1.0, 1.0, 0.0,
			-1.0,-1.0,0.0,
			1.0,-1.0,0.0,
			1.0,1.0,0.0
			]);
	// var textures = new Float32Array([
	//     0.0,1.0,
	//     0.0,0.0,
	//     1.0,0.0,
	//     1.0,1.0
	// ]);         
	var textures = new Float32Array([
			-1.0,1.0,
			-1.0,-1.0,
			1.0,-1.0,
			1.0,1.0
			]);         

	var indices = [0,1,2,0,2,3];
	device_quad.num_indices = 6;

	vbo_vertices = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vbo_vertices);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

	vbo_textures = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vbo_textures);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textures), gl.STATIC_DRAW);

	vbo_indices = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vbo_indices);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);       
}


var time = 0;

function setMatrixUniforms(models)
{
	gl.uniformMatrix4fv(u_ModelLocation,false,models);
	gl.uniformMatrix4fv(u_ViewLocation,false,view);
	gl.uniformMatrix4fv(u_PerspLocation,false,persp);
	gl.uniformMatrix4fv(u_InvTransLocation,false,invTrans);    
}

function setMatrixUniforms_foward(models)
{
    gl.uniformMatrix4fv(u_f_ModelLocation,false,models);
    gl.uniformMatrix4fv(u_f_ViewLocation,false,view);
    gl.uniformMatrix4fv(u_f_PerspLocation,false,persp);
    gl.uniformMatrix4fv(u_f_InvTransLocation,false,invTrans);    
}
//Okay, so, the making of the uniforms we're probably going to use.
//Oddly, there are the models being passed in, I'm not sure how the others make it though. 


var mv = mat4.create();
var dragonColor = vec3.create([0.2,0.3,0.4]); //Stanford dragon?
function drawmesh() //Actual draw call. 
{
    if(isLoadingComplete){
    	gl.useProgram(pass_prog);	

    	for(var idx = 0; idx < models.length; idx++){
    		for(var i = 0; i < vBuffers.length; i++){
    			
    			mat4.multiply(view, models[idx], mv); //This command will not work with our libraries,
				//change to mult.

    			//invTrans = mat4.create();
				//Also, all these functions. Need to be translated.
    			mat4.identity(invTrans);
    			mat4.inverse(mv, invTrans);
    			mat4.transpose(invTrans);

    			gl.enableVertexAttribArray(positionLocation);
    			gl.enableVertexAttribArray(normalLocation);
    			gl.enableVertexAttribArray(texCoordLocation);

 			
    			//gl.uniform3fv(gl.getUniformLocation(pass_prog,"u_Color"),dragonColor);

            	gl.activeTexture(gl.TEXTURE0);
           	 	gl.bindTexture(gl.TEXTURE_2D, meshTextures[i]);
            	gl.uniform1i(u_textureLocation,0);


    			gl.bindBuffer(gl.ARRAY_BUFFER, vBuffers[i]);
    			gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

    			gl.bindBuffer(gl.ARRAY_BUFFER, nBuffers[i]);
    			gl.vertexAttribPointer(normalLocation, 3, gl.FLOAT, false, 0, 0);

            	gl.bindBuffer(gl.ARRAY_BUFFER, tBuffers[i]);
            	gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);
    			
    			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffers[i]);

    			setMatrixUniforms(models[idx]);
    			gl.drawElements(gl.TRIANGLES, iBuffers[i].numItems, gl.UNSIGNED_SHORT, 0);

    			//idx ++;
    		}
    	}

    	gl.disableVertexAttribArray(positionLocation); //We don't actually need to use these things, but...
    	gl.disableVertexAttribArray(normalLocation); // well, not going to change them. 
    	gl.disableVertexAttribArray(texCoordLocation);// IF(NOT BROKE) {} ELSE {FIX()};
    	gl.bindBuffer(gl.ARRAY_BUFFER, null);
    	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }
}

var timetest = 0;
//draw buffer extension is NOT supported //No need for this function

//Probably don't need this.
//Probably.
//Not killing it yet.
function drawmesh_forward(eachLightPos, eachLightColor, eachLightRadius, drawmode)
{
    if(isLoadingComplete){
        gl.useProgram(forward_prog);   

        for(var idx = 0; idx < models.length; idx++){
            for(var i = 0; i < vBuffers.length; i++){
                
                mat4.multiply(view, models[idx], mv);

                //invTrans = mat4.create();
                mat4.identity(invTrans);
                mat4.inverse(mv, invTrans);
                mat4.transpose(invTrans);

                gl.enableVertexAttribArray(f_positionLocation);
                gl.enableVertexAttribArray(f_normalLocation);
                gl.enableVertexAttribArray(f_texCoordLocation);

            
                //gl.uniform3fv(gl.getUniformLocation(pass_prog,"u_Color"),dragonColor);

                gl.uniform3fv(u_f_lightPos, eachLightPos);
                gl.uniform3fv(u_f_lightColor, eachLightColor);
                gl.uniform1f(u_f_lightRadius, eachLightRadius);
                gl.uniform1i(u_f_drawmodeLoc, drawmode);
                gl.uniform4fv(u_f_ambientLightLoc, lightdest);


                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, meshTextures[i]);
                gl.uniform1i(u_f_textureLocation,0);


                gl.bindBuffer(gl.ARRAY_BUFFER, vBuffers[i]);
                gl.vertexAttribPointer(f_positionLocation, 3, gl.FLOAT, false, 0, 0);

                gl.bindBuffer(gl.ARRAY_BUFFER, nBuffers[i]);
                gl.vertexAttribPointer(f_normalLocation, 3, gl.FLOAT, false, 0, 0);

                gl.bindBuffer(gl.ARRAY_BUFFER, tBuffers[i]);
                gl.vertexAttribPointer(f_texCoordLocation, 2, gl.FLOAT, false, 0, 0);
                
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffers[i]);

                setMatrixUniforms_foward(models[idx]);

                gl.drawElements(gl.TRIANGLES, iBuffers[i].numItems, gl.UNSIGNED_SHORT, 0);
            }
        }

        gl.disableVertexAttribArray(f_positionLocation);
        gl.disableVertexAttribArray(f_normalLocation);
        gl.disableVertexAttribArray(f_texCoordLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }
}

var display_type = 5;

var lightGridTex = gl.createTexture();
var lightIndexTex = gl.createTexture();
var lightPositionTex = gl.createTexture();
var lightColorRadiusTex = gl.createTexture();

var lightIndexWidth, lightIndexHeight;

//Not sure what this one does
function lightQuad(program)
{
	gl.uniform1i(u_TileSizeLocation, tileSize);
	gl.uniform1i(u_LightNumLocation, lightNum);    
	gl.uniform1f(u_WidthTileLocation, tileWidth);
	gl.uniform1f(u_HeightTileLocation, tileHeight);
    gl.uniform1i(u_MaxTileLightNumLocation, maxTileLightNum);



	var lightIndexWidth = Math.ceil(Math.sqrt(lightIndex.length));

	for(var i = lightIndex.length; i < lightIndexWidth*lightIndexWidth; i++)
	{
		lightIndex.push(-1);
	}       

    for(var i = 0; i < lightGrid.length; i+=3)
    {
        lightGrid[i+2] = lightGrid[i] / lightIndexWidth;
        lightGrid[i] = lightGrid[i] % lightIndexWidth; 
    }

    gl.activeTexture(gl.TEXTURE4);
    gl.bindTexture(gl.TEXTURE_2D, lightGridTex); 
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, tileWidth, tileHeight, 0, gl.RGB, gl.FLOAT, new Float32Array(lightGrid));       
    gl.uniform1i(u_LightGridtexLocation,4);  
     

	gl.uniform1i(u_LightIndexImageSizeLocation, lightIndexWidth);      
	gl.uniform1f(u_FloatLightIndexSizeLocation, lightIndexWidth);    

	gl.activeTexture(gl.TEXTURE5);
	gl.bindTexture(gl.TEXTURE_2D, lightIndexTex);   
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, lightIndexWidth, lightIndexWidth, 0, gl.LUMINANCE, gl.FLOAT, new Float32Array(lightIndex));       
	gl.uniform1i(u_LightIndextexLocation,5);


	gl.activeTexture(gl.TEXTURE6);
	gl.bindTexture(gl.TEXTURE_2D, lightPositionTex);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, lightPosition.length/3, 1.0, 0, gl.RGB, gl.FLOAT, new Float32Array(lightPosition));       
	gl.uniform1i(u_LightPositiontexLocation,6);


	gl.activeTexture(gl.TEXTURE7);
	gl.bindTexture(gl.TEXTURE_2D, lightColorRadiusTex);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, lightColorRadius.length/4, 1.0, 0, gl.RGBA, gl.FLOAT, new Float32Array(lightColorRadius));
	gl.uniform1i(u_LightColorRadiustexLocation,7);
}



//THIS ONE WE REALLY NEED.
//REALLY. This is what actually powers our write back method.
function setupQuad(program, locs)
{
	gl.useProgram(program);
	//gl.enable(gl.BLEND);

	gl.uniform1i(locs[0], display_type);

	gl.uniform1f(locs[1], near);
	gl.uniform1f(locs[2], far);


	gl.uniform1f(locs[3], canvas.width);
	gl.uniform1f(locs[4], canvas.height); 


	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, depthTexture);
	gl.uniform1i(locs[5],0);

	gl.activeTexture(gl.TEXTURE1);
	gl.bindTexture(gl.TEXTURE_2D, normalTexture);
	gl.uniform1i(locs[6],1);

	gl.activeTexture(gl.TEXTURE2);
	gl.bindTexture(gl.TEXTURE_2D, positionTexture);
	gl.uniform1i(locs[7],2);

	gl.activeTexture(gl.TEXTURE3);
	gl.bindTexture(gl.TEXTURE_2D, colorTexture);
	gl.uniform1i(locs[8],3);

}

//INK? OH GOD, WHAT IS INK.
//
function setupInk(program)
{
	gl.useProgram(program);

	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, normalTexture);
	gl.uniform1i(gl.getUniformLocation(program, "u_Normaltex"),1);

	gl.activeTexture(gl.TEXTURE1);
	gl.bindTexture(gl.TEXTURE_2D, positionTexture);
	gl.uniform1i(gl.getUniformLocation(program, "u_Positiontex"),2);

	gl.activeTexture(gl.TEXTURE3);
	gl.bindTexture(gl.TEXTURE_2D, inkTexture);
	gl.uniform1i(gl.getUniformLocation(program, "u_InkColortex"),3);
}


//Good draw call, used just in order to build up the space we need to backstep into.
function drawQuad()
{
	gl.enableVertexAttribArray(quad_positionLocation);
	gl.bindBuffer(gl.ARRAY_BUFFER, vbo_vertices);
	gl.vertexAttribPointer(quad_positionLocation, 3, gl.FLOAT, false, 0, 0);

	gl.enableVertexAttribArray(quad_texCoordLocation);  
	gl.bindBuffer(gl.ARRAY_BUFFER, vbo_textures);  
	gl.vertexAttribPointer(quad_texCoordLocation, 2, gl.FLOAT, false, 0, 0); 

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vbo_indices);   

	gl.drawElements(gl.TRIANGLES, device_quad.num_indices, gl.UNSIGNED_SHORT, 0);          

	gl.disableVertexAttribArray(quad_positionLocation);
	gl.disableVertexAttribArray(quad_texCoordLocation);
}


//Binding our framebuffer object. 
//---// We're really only going to be using FBO[0]
function bindFBO(buf){
	//gl.disable(gl.BLEND);
	gl.bindTexture(gl.TEXTURE_2D, null);
	gl.bindFramebuffer(gl.FRAMEBUFFER, FBO[buf]);
	gl.clear(gl.DEPTH_BUFFER_BIT);
	gl.enable(gl.DEPTH_TEST);
}

//We're set textures to literally nothing.
function setTextures() {
	//gl.enable(gl.BLEND);
	gl.bindTexture(gl.TEXTURE_2D,null); 
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);

	gl.disable(gl.DEPTH_TEST);
	gl.clear(gl.COLOR_BUFFER_BIT);
}
var sliderBarActive = false

//////////////////user interface////////////////////////
//We'll be replacing this segment later with our UI work
//Basically this will just log our keystrokes, listen for the right ones.
function showValue(newValue)
{
    document.getElementById("range").innerHTML=newValue;
    document.getElementById("helplightnum").innerHTML = newValue;
   
    sliderBarActive = true;

    lightNum =  $('#range').text();
    initLights();
    setUpLights();
    initLightsFBO();     
}


function showMode()
{
     if(isDeferredshading){
        if(display_type == display_light)
            document.getElementById("helpmode").innerHTML = "Tile Based Deferred Shading";
        else if(display_type == display_nontilelight)
            document.getElementById("helpmode").innerHTML = "Non Tile Based Deferred Shading";
        else if(display_type == display_depth)
            document.getElementById("helpmode").innerHTML = "Depth Texture";
        else if(display_type == display_normal)
            document.getElementById("helpmode").innerHTML = "Normal Texture";
        else if(display_type == display_position)
            document.getElementById("helpmode").innerHTML = "Position Texture";
        else if(display_type == display_color)
            document.getElementById("helpmode").innerHTML = "Color Texture";
        else if(display_type == display_total)
            document.getElementById("helpmode").innerHTML = "Ambient Texture";
        else if(display_type == display_ink)
            document.getElementById("helpmode").innerHTML = "Chinese Painting Shading";
        else if(display_type == display_debugtile)
            document.getElementById("helpmode").innerHTML = "Debug Tile Visualization";
        else if(display_type == display_scissor)
            document.getElementById("helpmode").innerHTML = "Scissor Test Visualization";
    }
    else
        document.getElementById("helpmode").innerHTML = "Forward Shading";
}

var upKey = vec3.create();
var right = vec3.create();
var vec3Temp = vec3.create();
var dir = vec3.create();
function keyMove(type)
{	
    vec3Temp[0] = center[0]-eye[0]; vec3Temp[1] = center[1]-eye[1]; vec3Temp[2] = center[2]-eye[2];
    vec3.normalize(vec3Temp, dir);
    upKey[0] = 0; upKey[1] = 1; upKey[2] = 0;	
	vec3.normalize(vec3.cross(dir,upKey, right));
	vec3.normalize(vec3.cross(right,dir, upKey));     

	var scale = 0.1;

	if(type == 1){
		center[0] +=  dir[0] * scale;
		center[1] +=  dir[1] * scale;
		center[2] +=  dir[2] * scale;
	}
	else if(type == 2)
	{
		center[0] -=  dir[0] * scale;
		center[1] -=  dir[1] * scale;
		center[2] -=  dir[2] * scale;
	}
	else if(type == 3)
	{
		center[0] -=  right[0] * scale;
		center[1] -=  right[1] * scale;
		center[2] -=  right[2] * scale;
	}
	else if(type == 4)
	{
		center[0] +=  right[0] * scale;
		center[1] +=  right[1] * scale;
		center[2] +=  right[2] * scale;
	}
	else if(type == 5)
	{
		center[0] +=  0 * scale;
		center[1] +=  1 * scale;
		center[2] +=  0 * scale;
	}
	else if(type == 6)
	{
		center[0] -=  0 * scale;
		center[1] -=  1 * scale;
		center[2] -=  0 * scale;
	}
}

function keyPress(e){
	var keynum;

	if(window.event){ // IE                 
		keynum = e.keyCode;
	}else
		if(e.which){ // Netscape/Firefox/Opera                  
			keynum = e.which;
		}

	if(keynum == 119)//w
	{
		keyMove(1);
	}
	else if(keynum == 115)//s
	{
		keyMove(2);          
	}
	else if(keynum == 97)//a
	{
		keyMove(3);
	}
	else if(keynum == 100)//d
	{
		keyMove(4);
	}
	else if(keynum == 113){
		keyMove(5);
	}
	else if(keynum == 101){
		keyMove(6);
	}
    else if(keynum == 102){
        isDeferredshading = !isDeferredshading;
    }
    
   

	if(keynum-48>=0 && keynum-49 <= 10){
		display_type = keynum - 49;        
    }
    showMode()
}

document.onkeypress = keyPress;


var mouseLeftDown = false;
var mouseRightDown = false;
var mouseMiddleDown = false;
var lastMouseX = null;
var lastMouseY = null;

function handleMouseDown(event) {
	if( event.button == 2 ) {
		mouseLeftDown = false;
		mouseMiddleDown = false;
		mouseRightDown = true;
	}
	else if(event.button == 0){
		mouseLeftDown = true;
		mouseRightDown = false;
		mouseMiddleDown = false;
	}
	else if(event.button == 1){
		mouseLeftDown = false;
		mouseRightDown = false;
		mouseMiddleDown = true;
	}

	lastMouseX = event.clientX;
	lastMouseY = event.clientY;
}

function handleMouseUp(event) {
	mouseLeftDown = false;
	mouseRightDown = false;
	mouseMiddleDown = false;
}

var MouseDowndeltaX = 0;
var MouseDowndeltaY = 0;
function handleMouseMove(event) {


	if (!(mouseLeftDown || mouseRightDown || mouseMiddleDown)) {
		return;
	}
	var newX = event.clientX;
	var newY = event.clientY;

	var deltaX = newX - lastMouseX;
	var deltaY = newY - lastMouseY;


	if(mouseLeftDown)
	{
		azimuth += 0.01 * deltaX;
		elevation += 0.01 * deltaY; 
	}
	else if( mouseMiddleDown )
	{           
		MouseDowndeltaY = deltaY;
		MouseDowndeltaX = deltaX;

		// var dir = vec3.normalize(vec3.create([center[0]-eye[0], center[1]-eye[1], center[2]-eye[2]]));
		// var up = vec3.create([0,1,0]);
		// var right = vec3.create();
		// vec3.normalize(vec3.cross(dir,up, right));
		// vec3.normalize(vec3.cross(right,dir, up));   
        vec3Temp[0] = center[0]-eye[0]; vec3Temp[1] = center[1]-eye[1]; vec3Temp[2] = center[2]-eye[2];
        vec3.normalize(vec3Temp, dir);
        upKey[0] = 0; upKey[1] = 1; upKey[2] = 0;   
        vec3.normalize(vec3.cross(dir,upKey, right));
        vec3.normalize(vec3.cross(right,dir, upKey));       

		center[0] += 0.01 * (MouseDowndeltaY * up[0] - MouseDowndeltaX * right[0]);
		center[1] += 0.01 * (MouseDowndeltaY * up[1] - MouseDowndeltaX * right[1]);
		center[2] += 0.01 * (MouseDowndeltaY * up[2] - MouseDowndeltaX * right[2]);      
	}
	else if(mouseRightDown)
	{
        vec3Temp[0] = center[0]-eye[0]; vec3Temp[1] = center[1]-eye[1]; vec3Temp[2] = center[2]-eye[2];
        vec3.normalize(vec3Temp, dir);
        var sign = deltaX > 0?1:-1;
        center[0] += 0.02*dir[0]*sign;
        center[1] += 0.02*dir[1]*sign;
        center[2] += 0.02*dir[2]*sign;        
	}

	lastMouseX = newX;
	lastMouseY = newY;
}

canvas.onmousedown = handleMouseDown;
//canvas.oncontextmenu = function(ev) {return false;};
document.onmouseup = handleMouseUp;
document.onmousemove = handleMouseMove;  

//---------- Okay, I think we're out of the UI section. -----------\\ 
var stats = new Stats();
stats.setMode(0); // 0: fps, 1: ms

// Align top-left
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';

document.body.appendChild( stats.domElement );

function camera()
{
	eye[0] = center[0] + eyedis * Math.cos(azimuth) * Math.cos(elevation);
	eye[1] = center[1] + eyedis * Math.sin(elevation);
	eye[2] = center[2] + eyedis * Math.cos(elevation) * Math.sin(azimuth);

	mat4.lookAt(eye, center, up, view);
}

window.cancelRequestAnimFrame = ( function() {
    return window.cancelAnimationFrame          ||
        window.webkitCancelRequestAnimationFrame    ||
        window.mozCancelRequestAnimationFrame       ||
        window.oCancelRequestAnimationFrame     ||
        window.msCancelRequestAnimationFrame        ||
        clearTimeout
} )();

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(/* function */ callback, /* DOMElement */ element){
            return window.setTimeout(callback, 1000 / 60);
        };
})();

var request;

var lightPos = vec4.create([0.0, 1.0, 0.0, 0.3]);
var lightdest = vec4.create();
var inkLight = vec4.create([0.0, 0.0, 0.0, 0.3]);
var time = 0;

var eachLightPos = vec3.create();
var eachLightColor = vec3.create();
var eachLightRadius;

//Uh. Animate? Hopefully, we're going to be killing this function.
function animate() 
{ 
	camera();
	
	mat4.multiplyVec4(view, [lightPos[0], lightPos[1], lightPos[2], 0.0], lightdest);
	lightdest[3] = 0.3;

//This should be the one we use under most, if not all, occasions.

        gl.enable(gl.DEPTH_TEST);         
        gl.depthFunc(gl.LESS);

        setTextures();            
    	bindFBO(0);
    	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    	drawmesh(); //So, drawmesh is our first run through, that's why we're binding FBO(0)
    
    	//2
    	setTextures();
    	gl.enable(gl.BLEND);
    	gl.disable(gl.DEPTH_TEST);
    	gl.blendFunc(gl.ONE, gl.ONE);
    	gl.clear(gl.COLOR_BUFFER_BIT);


//Okay, so all we really want to do is a single draw call with write back.
// Then step back and write from those buffers.
    	
    	setupQuad(ambient_prog, ambientLocs);
    	gl.uniform4fv(ambientLoc_Light, lightdest);
    	drawQuad();

    	gl.disable(gl.BLEND);
    	
    //reset
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.bindTexture(gl.TEXTURE_2D,null);
	
    stats.update();    

    //window.requestAnimFrame(animate); 
    request = requestAnimFrame(animate);

	
    //window.setTimeout(animate, 1000 / 60);
}

function testt()
{
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    drawmesh(); 
    window.requestAnimFrame(testt); 
    stats.update();
}

(function loadWebGL(){    

	initializeShader();
	initializeFBO();      

	initMeshBuffers();

	initializeQuad();

	// initLights();
	// setUpLights();
	// initLightsFBO();      
		
 //    //testt();
	// animate();
	
	//Cool, so  we've done a single pass of the program.
	//We need to hook up our meshes, integrate the draw calls, edit the primary shader, 
	//change all of the load commands. 
	//We also need to use the perspective transformation and all that good shit. 
	//First thing will be to slam out some good code for... probably getting the textures ready.
	//There is a version of the perspective matrix from the values of the near and far planes.
})();