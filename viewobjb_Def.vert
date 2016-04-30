
    attribute vec3 Position;
    attribute vec2 Texcoord;
	//Adapted from GitHub repository of YuqinShao's DR shading.
    varying vec2 fs_TexCoord;
	
    void main() {
       fs_TexCoord = Texcoord * 0.5 + vec2(0.5);
       gl_Position = vec4(Position,1.0);
    }
