// function to attach an OBJ mesh to a containiner
function genObj_cube(container) {
   container["cube"] = {
      numVertices : 30,
      vertexDim : 3,
      numFaces : 24,
      faceDim : 3,
      texDim : 2,
      tangentDim : 3,
      vertexBlock : new Float32Array(90), 
	  vertexBlockFull : new Float32Array(900),
      normalBlock : new Float32Array(90),
	  normalBlockFull : new Float32Array(900),
      texCoordBlock : new Float32Array(60),
	  texCoordBlockFull : new Float32Array(600),
      tangentBlock : new Float32Array(90),
	  tangentBlockFull : new Float32Array(900),
      faceVertexBlock : new Uint16Array(72),
	  faceVertexBlockFull : new Uint16Array(720),
	  rotationIndexBlock : new Float32Array(1200),
      minBound : new Float32Array([-1.0, -1.0, -1.0]),
      maxBound : new Float32Array([1.0, 1.0, 1.0]),
      centroid : new Float32Array([0.0, 0.0, 0.0]),
      }
   container["cube"].vertexBlock[0]=-1.0;
   container["cube"].vertexBlock[1]=-1.0;
   container["cube"].vertexBlock[2]=-1.0;
   container["cube"].vertexBlock[3]=1.0;
   container["cube"].vertexBlock[4]=-1.0;
   container["cube"].vertexBlock[5]=-1.0;
   container["cube"].vertexBlock[6]=1.0;
   container["cube"].vertexBlock[7]=-1.0;
   container["cube"].vertexBlock[8]=1.0;
   container["cube"].vertexBlock[9]=-1.0;
   container["cube"].vertexBlock[10]=-1.0;
   container["cube"].vertexBlock[11]=1.0;
   container["cube"].vertexBlock[12]=0.0;
   container["cube"].vertexBlock[13]=-1.0;
   container["cube"].vertexBlock[14]=0.0;
   container["cube"].vertexBlock[15]=1.0;
   container["cube"].vertexBlock[16]=1.0;
   container["cube"].vertexBlock[17]=-1.0;
   container["cube"].vertexBlock[18]=-1.0;
   container["cube"].vertexBlock[19]=1.0;
   container["cube"].vertexBlock[20]=-1.0;
   container["cube"].vertexBlock[21]=-1.0;
   container["cube"].vertexBlock[22]=1.0;
   container["cube"].vertexBlock[23]=1.0;
   container["cube"].vertexBlock[24]=1.0;
   container["cube"].vertexBlock[25]=1.0;
   container["cube"].vertexBlock[26]=1.0;
   container["cube"].vertexBlock[27]=0.0;
   container["cube"].vertexBlock[28]=1.0;
   container["cube"].vertexBlock[29]=0.0;
   container["cube"].vertexBlock[30]=1.0;
   container["cube"].vertexBlock[31]=-1.0;
   container["cube"].vertexBlock[32]=-1.0;
   container["cube"].vertexBlock[33]=1.0;
   container["cube"].vertexBlock[34]=1.0;
   container["cube"].vertexBlock[35]=-1.0;
   container["cube"].vertexBlock[36]=1.0;
   container["cube"].vertexBlock[37]=1.0;
   container["cube"].vertexBlock[38]=1.0;
   container["cube"].vertexBlock[39]=1.0;
   container["cube"].vertexBlock[40]=-1.0;
   container["cube"].vertexBlock[41]=1.0;
   container["cube"].vertexBlock[42]=1.0;
   container["cube"].vertexBlock[43]=0.0;
   container["cube"].vertexBlock[44]=0.0;
   container["cube"].vertexBlock[45]=-1.0;
   container["cube"].vertexBlock[46]=1.0;
   container["cube"].vertexBlock[47]=-1.0;
   container["cube"].vertexBlock[48]=-1.0;
   container["cube"].vertexBlock[49]=-1.0;
   container["cube"].vertexBlock[50]=-1.0;
   container["cube"].vertexBlock[51]=-1.0;
   container["cube"].vertexBlock[52]=-1.0;
   container["cube"].vertexBlock[53]=1.0;
   container["cube"].vertexBlock[54]=-1.0;
   container["cube"].vertexBlock[55]=1.0;
   container["cube"].vertexBlock[56]=1.0;
   container["cube"].vertexBlock[57]=-1.0;
   container["cube"].vertexBlock[58]=0.0;
   container["cube"].vertexBlock[59]=0.0;
   container["cube"].vertexBlock[60]=-1.0;
   container["cube"].vertexBlock[61]=-1.0;
   container["cube"].vertexBlock[62]=1.0;
   container["cube"].vertexBlock[63]=1.0;
   container["cube"].vertexBlock[64]=-1.0;
   container["cube"].vertexBlock[65]=1.0;
   container["cube"].vertexBlock[66]=1.0;
   container["cube"].vertexBlock[67]=1.0;
   container["cube"].vertexBlock[68]=1.0;
   container["cube"].vertexBlock[69]=-1.0;
   container["cube"].vertexBlock[70]=1.0;
   container["cube"].vertexBlock[71]=1.0;
   container["cube"].vertexBlock[72]=0.0;
   container["cube"].vertexBlock[73]=0.0;
   container["cube"].vertexBlock[74]=1.0;
   container["cube"].vertexBlock[75]=-1.0;
   container["cube"].vertexBlock[76]=1.0;
   container["cube"].vertexBlock[77]=-1.0;
   container["cube"].vertexBlock[78]=1.0;
   container["cube"].vertexBlock[79]=1.0;
   container["cube"].vertexBlock[80]=-1.0;
   container["cube"].vertexBlock[81]=1.0;
   container["cube"].vertexBlock[82]=-1.0;
   container["cube"].vertexBlock[83]=-1.0;
   container["cube"].vertexBlock[84]=-1.0;
   container["cube"].vertexBlock[85]=-1.0;
   container["cube"].vertexBlock[86]=-1.0;
   container["cube"].vertexBlock[87]=0.0;
   container["cube"].vertexBlock[88]=0.0;
   container["cube"].vertexBlock[89]=-1.0;
   container["cube"].faceVertexBlock[0]=29;
   container["cube"].faceVertexBlock[1]=25;
   container["cube"].faceVertexBlock[2]=26;
   container["cube"].faceVertexBlock[3]=29;
   container["cube"].faceVertexBlock[4]=26;
   container["cube"].faceVertexBlock[5]=27;
   container["cube"].faceVertexBlock[6]=29;
   container["cube"].faceVertexBlock[7]=27;
   container["cube"].faceVertexBlock[8]=28;
   container["cube"].faceVertexBlock[9]=29;
   container["cube"].faceVertexBlock[10]=28;
   container["cube"].faceVertexBlock[11]=25;
   container["cube"].faceVertexBlock[12]=24;
   container["cube"].faceVertexBlock[13]=20;
   container["cube"].faceVertexBlock[14]=21;
   container["cube"].faceVertexBlock[15]=24;
   container["cube"].faceVertexBlock[16]=21;
   container["cube"].faceVertexBlock[17]=22;
   container["cube"].faceVertexBlock[18]=24;
   container["cube"].faceVertexBlock[19]=22;
   container["cube"].faceVertexBlock[20]=23;
   container["cube"].faceVertexBlock[21]=24;
   container["cube"].faceVertexBlock[22]=23;
   container["cube"].faceVertexBlock[23]=20;
   container["cube"].faceVertexBlock[24]=14;
   container["cube"].faceVertexBlock[25]=10;
   container["cube"].faceVertexBlock[26]=11;
   container["cube"].faceVertexBlock[27]=14;
   container["cube"].faceVertexBlock[28]=11;
   container["cube"].faceVertexBlock[29]=12;
   container["cube"].faceVertexBlock[30]=14;
   container["cube"].faceVertexBlock[31]=12;
   container["cube"].faceVertexBlock[32]=13;
   container["cube"].faceVertexBlock[33]=14;
   container["cube"].faceVertexBlock[34]=13;
   container["cube"].faceVertexBlock[35]=10;
   container["cube"].faceVertexBlock[36]=19;
   container["cube"].faceVertexBlock[37]=15;
   container["cube"].faceVertexBlock[38]=16;
   container["cube"].faceVertexBlock[39]=19;
   container["cube"].faceVertexBlock[40]=16;
   container["cube"].faceVertexBlock[41]=17;
   container["cube"].faceVertexBlock[42]=19;
   container["cube"].faceVertexBlock[43]=17;
   container["cube"].faceVertexBlock[44]=18;
   container["cube"].faceVertexBlock[45]=19;
   container["cube"].faceVertexBlock[46]=18;
   container["cube"].faceVertexBlock[47]=15;
   container["cube"].faceVertexBlock[48]=9;
   container["cube"].faceVertexBlock[49]=5;
   container["cube"].faceVertexBlock[50]=6;
   container["cube"].faceVertexBlock[51]=9;
   container["cube"].faceVertexBlock[52]=6;
   container["cube"].faceVertexBlock[53]=7;
   container["cube"].faceVertexBlock[54]=9;
   container["cube"].faceVertexBlock[55]=7;
   container["cube"].faceVertexBlock[56]=8;
   container["cube"].faceVertexBlock[57]=9;
   container["cube"].faceVertexBlock[58]=8;
   container["cube"].faceVertexBlock[59]=5;
   container["cube"].faceVertexBlock[60]=4;
   container["cube"].faceVertexBlock[61]=0;
   container["cube"].faceVertexBlock[62]=1;
   container["cube"].faceVertexBlock[63]=4;
   container["cube"].faceVertexBlock[64]=1;
   container["cube"].faceVertexBlock[65]=2;
   container["cube"].faceVertexBlock[66]=4;
   container["cube"].faceVertexBlock[67]=2;
   container["cube"].faceVertexBlock[68]=3;
   container["cube"].faceVertexBlock[69]=4;
   container["cube"].faceVertexBlock[70]=3;
   container["cube"].faceVertexBlock[71]=0;
   container["cube"].normalBlock[0]=0.0;
   container["cube"].normalBlock[1]=-1.0;
   container["cube"].normalBlock[2]=0.0;
   container["cube"].normalBlock[3]=0.0;
   container["cube"].normalBlock[4]=-1.0;
   container["cube"].normalBlock[5]=0.0;
   container["cube"].normalBlock[6]=0.0;
   container["cube"].normalBlock[7]=-1.0;
   container["cube"].normalBlock[8]=0.0;
   container["cube"].normalBlock[9]=0.0;
   container["cube"].normalBlock[10]=-1.0;
   container["cube"].normalBlock[11]=0.0;
   container["cube"].normalBlock[12]=0.0;
   container["cube"].normalBlock[13]=-1.0;
   container["cube"].normalBlock[14]=0.0;
   container["cube"].normalBlock[15]=0.0;
   container["cube"].normalBlock[16]=1.0;
   container["cube"].normalBlock[17]=0.0;
   container["cube"].normalBlock[18]=0.0;
   container["cube"].normalBlock[19]=1.0;
   container["cube"].normalBlock[20]=0.0;
   container["cube"].normalBlock[21]=0.0;
   container["cube"].normalBlock[22]=1.0;
   container["cube"].normalBlock[23]=0.0;
   container["cube"].normalBlock[24]=0.0;
   container["cube"].normalBlock[25]=1.0;
   container["cube"].normalBlock[26]=0.0;
   container["cube"].normalBlock[27]=0.0;
   container["cube"].normalBlock[28]=1.0;
   container["cube"].normalBlock[29]=0.0;
   container["cube"].normalBlock[30]=1.0;
   container["cube"].normalBlock[31]=0.0;
   container["cube"].normalBlock[32]=0.0;
   container["cube"].normalBlock[33]=1.0;
   container["cube"].normalBlock[34]=0.0;
   container["cube"].normalBlock[35]=0.0;
   container["cube"].normalBlock[36]=1.0;
   container["cube"].normalBlock[37]=0.0;
   container["cube"].normalBlock[38]=0.0;
   container["cube"].normalBlock[39]=1.0;
   container["cube"].normalBlock[40]=0.0;
   container["cube"].normalBlock[41]=0.0;
   container["cube"].normalBlock[42]=1.0;
   container["cube"].normalBlock[43]=0.0;
   container["cube"].normalBlock[44]=0.0;
   container["cube"].normalBlock[45]=-1.0;
   container["cube"].normalBlock[46]=0.0;
   container["cube"].normalBlock[47]=0.0;
   container["cube"].normalBlock[48]=-1.0;
   container["cube"].normalBlock[49]=0.0;
   container["cube"].normalBlock[50]=0.0;
   container["cube"].normalBlock[51]=-1.0;
   container["cube"].normalBlock[52]=0.0;
   container["cube"].normalBlock[53]=0.0;
   container["cube"].normalBlock[54]=-1.0;
   container["cube"].normalBlock[55]=0.0;
   container["cube"].normalBlock[56]=0.0;
   container["cube"].normalBlock[57]=-1.0;
   container["cube"].normalBlock[58]=0.0;
   container["cube"].normalBlock[59]=0.0;
   container["cube"].normalBlock[60]=0.0;
   container["cube"].normalBlock[61]=0.0;
   container["cube"].normalBlock[62]=1.0;
   container["cube"].normalBlock[63]=0.0;
   container["cube"].normalBlock[64]=0.0;
   container["cube"].normalBlock[65]=1.0;
   container["cube"].normalBlock[66]=0.0;
   container["cube"].normalBlock[67]=0.0;
   container["cube"].normalBlock[68]=1.0;
   container["cube"].normalBlock[69]=0.0;
   container["cube"].normalBlock[70]=0.0;
   container["cube"].normalBlock[71]=1.0;
   container["cube"].normalBlock[72]=0.0;
   container["cube"].normalBlock[73]=0.0;
   container["cube"].normalBlock[74]=1.0;
   container["cube"].normalBlock[75]=0.0;
   container["cube"].normalBlock[76]=0.0;
   container["cube"].normalBlock[77]=-1.0;
   container["cube"].normalBlock[78]=0.0;
   container["cube"].normalBlock[79]=0.0;
   container["cube"].normalBlock[80]=-1.0;
   container["cube"].normalBlock[81]=0.0;
   container["cube"].normalBlock[82]=0.0;
   container["cube"].normalBlock[83]=-1.0;
   container["cube"].normalBlock[84]=0.0;
   container["cube"].normalBlock[85]=0.0;
   container["cube"].normalBlock[86]=-1.0;
   container["cube"].normalBlock[87]=0.0;
   container["cube"].normalBlock[88]=0.0;
   container["cube"].normalBlock[89]=-1.0;
   container["cube"].texCoordBlock[0]=0.0;
   container["cube"].texCoordBlock[1]=0.0;
   container["cube"].texCoordBlock[2]=1.0;
   container["cube"].texCoordBlock[3]=0.0;
   container["cube"].texCoordBlock[4]=1.0;
   container["cube"].texCoordBlock[5]=1.0;
   container["cube"].texCoordBlock[6]=0.0;
   container["cube"].texCoordBlock[7]=1.0;
   container["cube"].texCoordBlock[8]=0.5;
   container["cube"].texCoordBlock[9]=0.5;
   container["cube"].texCoordBlock[10]=0.0;
   container["cube"].texCoordBlock[11]=0.0;
   container["cube"].texCoordBlock[12]=1.0;
   container["cube"].texCoordBlock[13]=0.0;
   container["cube"].texCoordBlock[14]=1.0;
   container["cube"].texCoordBlock[15]=1.0;
   container["cube"].texCoordBlock[16]=0.0;
   container["cube"].texCoordBlock[17]=1.0;
   container["cube"].texCoordBlock[18]=0.5;
   container["cube"].texCoordBlock[19]=0.5;
   container["cube"].texCoordBlock[20]=0.0;
   container["cube"].texCoordBlock[21]=0.0;
   container["cube"].texCoordBlock[22]=1.0;
   container["cube"].texCoordBlock[23]=0.0;
   container["cube"].texCoordBlock[24]=1.0;
   container["cube"].texCoordBlock[25]=1.0;
   container["cube"].texCoordBlock[26]=0.0;
   container["cube"].texCoordBlock[27]=1.0;
   container["cube"].texCoordBlock[28]=0.5;
   container["cube"].texCoordBlock[29]=0.5;
   container["cube"].texCoordBlock[30]=0.0;
   container["cube"].texCoordBlock[31]=0.0;
   container["cube"].texCoordBlock[32]=1.0;
   container["cube"].texCoordBlock[33]=0.0;
   container["cube"].texCoordBlock[34]=1.0;
   container["cube"].texCoordBlock[35]=1.0;
   container["cube"].texCoordBlock[36]=0.0;
   container["cube"].texCoordBlock[37]=1.0;
   container["cube"].texCoordBlock[38]=0.5;
   container["cube"].texCoordBlock[39]=0.5;
   container["cube"].texCoordBlock[40]=0.0;
   container["cube"].texCoordBlock[41]=0.0;
   container["cube"].texCoordBlock[42]=1.0;
   container["cube"].texCoordBlock[43]=0.0;
   container["cube"].texCoordBlock[44]=1.0;
   container["cube"].texCoordBlock[45]=1.0;
   container["cube"].texCoordBlock[46]=0.0;
   container["cube"].texCoordBlock[47]=1.0;
   container["cube"].texCoordBlock[48]=0.5;
   container["cube"].texCoordBlock[49]=0.5;
   container["cube"].texCoordBlock[50]=0.0;
   container["cube"].texCoordBlock[51]=0.0;
   container["cube"].texCoordBlock[52]=1.0;
   container["cube"].texCoordBlock[53]=0.0;
   container["cube"].texCoordBlock[54]=1.0;
   container["cube"].texCoordBlock[55]=1.0;
   container["cube"].texCoordBlock[56]=0.0;
   container["cube"].texCoordBlock[57]=1.0;
   container["cube"].texCoordBlock[58]=0.5;
   container["cube"].texCoordBlock[59]=0.5;
   container["cube"].tangentBlock[0]=1.0;
   container["cube"].tangentBlock[1]=0.0;
   container["cube"].tangentBlock[2]=0.0;
   container["cube"].tangentBlock[3]=1.0;
   container["cube"].tangentBlock[4]=0.0;
   container["cube"].tangentBlock[5]=0.0;
   container["cube"].tangentBlock[6]=1.0;
   container["cube"].tangentBlock[7]=0.0;
   container["cube"].tangentBlock[8]=0.0;
   container["cube"].tangentBlock[9]=1.0;
   container["cube"].tangentBlock[10]=0.0;
   container["cube"].tangentBlock[11]=0.0;
   container["cube"].tangentBlock[12]=1.0;
   container["cube"].tangentBlock[13]=0.0;
   container["cube"].tangentBlock[14]=0.0;
   container["cube"].tangentBlock[15]=-1.0;
   container["cube"].tangentBlock[16]=0.0;
   container["cube"].tangentBlock[17]=0.0;
   container["cube"].tangentBlock[18]=-1.0;
   container["cube"].tangentBlock[19]=0.0;
   container["cube"].tangentBlock[20]=0.0;
   container["cube"].tangentBlock[21]=-1.0;
   container["cube"].tangentBlock[22]=0.0;
   container["cube"].tangentBlock[23]=0.0;
   container["cube"].tangentBlock[24]=-1.0;
   container["cube"].tangentBlock[25]=0.0;
   container["cube"].tangentBlock[26]=0.0;
   container["cube"].tangentBlock[27]=-1.0;
   container["cube"].tangentBlock[28]=0.0;
   container["cube"].tangentBlock[29]=0.0;
   container["cube"].tangentBlock[30]=0.0;
   container["cube"].tangentBlock[31]=1.0;
   container["cube"].tangentBlock[32]=0.0;
   container["cube"].tangentBlock[33]=0.0;
   container["cube"].tangentBlock[34]=1.0;
   container["cube"].tangentBlock[35]=0.0;
   container["cube"].tangentBlock[36]=0.0;
   container["cube"].tangentBlock[37]=1.0;
   container["cube"].tangentBlock[38]=0.0;
   container["cube"].tangentBlock[39]=0.0;
   container["cube"].tangentBlock[40]=1.0;
   container["cube"].tangentBlock[41]=0.0;
   container["cube"].tangentBlock[42]=0.0;
   container["cube"].tangentBlock[43]=1.0;
   container["cube"].tangentBlock[44]=0.0;
   container["cube"].tangentBlock[45]=0.0;
   container["cube"].tangentBlock[46]=-1.0;
   container["cube"].tangentBlock[47]=0.0;
   container["cube"].tangentBlock[48]=0.0;
   container["cube"].tangentBlock[49]=-1.0;
   container["cube"].tangentBlock[50]=0.0;
   container["cube"].tangentBlock[51]=0.0;
   container["cube"].tangentBlock[52]=-1.0;
   container["cube"].tangentBlock[53]=0.0;
   container["cube"].tangentBlock[54]=0.0;
   container["cube"].tangentBlock[55]=-1.0;
   container["cube"].tangentBlock[56]=0.0;
   container["cube"].tangentBlock[57]=0.0;
   container["cube"].tangentBlock[58]=-1.0;
   container["cube"].tangentBlock[59]=0.0;
   container["cube"].tangentBlock[60]=1.0;
   container["cube"].tangentBlock[61]=0.0;
   container["cube"].tangentBlock[62]=0.0;
   container["cube"].tangentBlock[63]=1.0;
   container["cube"].tangentBlock[64]=0.0;
   container["cube"].tangentBlock[65]=0.0;
   container["cube"].tangentBlock[66]=1.0;
   container["cube"].tangentBlock[67]=0.0;
   container["cube"].tangentBlock[68]=0.0;
   container["cube"].tangentBlock[69]=1.0;
   container["cube"].tangentBlock[70]=0.0;
   container["cube"].tangentBlock[71]=0.0;
   container["cube"].tangentBlock[72]=1.0;
   container["cube"].tangentBlock[73]=0.0;
   container["cube"].tangentBlock[74]=0.0;
   container["cube"].tangentBlock[75]=1.0;
   container["cube"].tangentBlock[76]=0.0;
   container["cube"].tangentBlock[77]=0.0;
   container["cube"].tangentBlock[78]=1.0;
   container["cube"].tangentBlock[79]=0.0;
   container["cube"].tangentBlock[80]=0.0;
   container["cube"].tangentBlock[81]=1.0;
   container["cube"].tangentBlock[82]=0.0;
   container["cube"].tangentBlock[83]=0.0;
   container["cube"].tangentBlock[84]=1.0;
   container["cube"].tangentBlock[85]=0.0;
   container["cube"].tangentBlock[86]=0.0;
   container["cube"].tangentBlock[87]=1.0;
   container["cube"].tangentBlock[88]=0.0;
   container["cube"].tangentBlock[89]=0.0;
   
   
for (var i = 0; i<1200;i++)
{
	container["cube"].rotationIndexBlock[i]= Math.floor(i/120);
}
   
for (var i = 0; i<900; i++)
{
container["cube"].tangentBlockFull[i] = container["cube"].tangentBlock[i%90]
container["cube"].vertexBlockFull[i] = container["cube"].vertexBlock[i%90]
container["cube"].normalBlockFull[i] = container["cube"].normalBlock[i%90]
//Assignments
}
for (var i = 0; i<600; i++)
{
//Assignments
container["cube"].texCoordBlockFull[i] = container["cube"].texCoordBlock[i%60]
}
for (var i = 0; i<720; i++)
{
//Assignments
container["cube"].faceVertexBlockFull[i] = container["cube"].faceVertexBlock[i%72] + (Math.floor(i/72)*30) //That took for bloody ever.
}
  // for (var i = 0; i< 10; i++)
   //{
	//container["cube"].tangentBlockFull = container["cube"].tangentBlockFull.concat(container["cube"].tangentBlock);   
	//container["cube"].texCoordBlockFull = container["cube"].texCoordBlockFull.concat(container["cube"].texCoordBlock); 
	//container["cube"].normalBlockFull = container["cube"].normalBlockFull.concat(container["cube"].normalBlock);
	//container["cube"].faceVertexBlockFull = container["cube"].faceVertexBlockFull.concat(container["cube"].//faceVertexBlock);
	//container["cube"].vertexBlockFull = container["cube"].vertexBlockFull.concat(container["cube"].//vertexBlock);
   //}
   
   
   return container;
};