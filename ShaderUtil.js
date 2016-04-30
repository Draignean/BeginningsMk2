"use strict";


var uniformSetters = {
	float: function(val){ gl.uniform1f(this.loc, val) },
	mat4 : function(val){
		//console.log(val)
		//console.log(flatten(val))
		gl.uniformMatrix4fv(this.loc, false, flatten(val))
	},
	mat3 : function(val){
		//console.log(val)
		//console.log(flatten(val))
		gl.uniformMatrix3fv(this.loc, false, flatten(val))
	},
	vec3 : function(val){
		gl.uniform3fv(this.loc, flatten(val))},
	vec4 : function(val){gl.uniform4fv(this.loc, flatten(val))
}
}

function newUniform(prog, name, type) {
	return {
		name : name,
		loc : gl.getUniformLocation(prog, name),
		set : uniformSetters[type]
	}
}

function bufferData(buffer){
	if(buffer){
		console.log("buffering data", this.name, this.buffer, this.loc, buffer.length)
		gl.bindBuffer( gl.ARRAY_BUFFER, this.buffer)
		gl.bufferData( gl.ARRAY_BUFFER, flatten(buffer), gl.STATIC_DRAW )
	}else{
		console.log("attempt to buffer invalid data", this.name)
	}
}

function activateAttrib(){
	if(this.loc<0){ return }
	gl.bindBuffer( gl.ARRAY_BUFFER, this.buffer)
	gl.vertexAttribPointer( this.loc, 4, gl.FLOAT, false, 0, 0)
	gl.enableVertexAttribArray(this.loc)
}

function newAttribute(pro, name){
	return {
		name : name,
		loc : gl.getAttribLocation( program, name),
		buffer : gl.createBuffer(),
		bufferData : bufferData,
		activate : activateAttrib
	}
}
