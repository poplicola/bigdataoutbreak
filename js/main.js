/*
	# Data that will be available
	* Badge ID
	* Time Logged
	* UV Low
	* UV High
	* IR Low
	* IR High
	* Detected Badges
*/

/*

	# TO DO
	* bring data over from json file
	* change color of circles based on:
		* if they've been outside recently (and/or if near a healing kiosk, maybe this is where you put the collection table)
		* badges they have been near recently & if those badges were infected

*/

d3.csv("../csv/livelog", function(data) {
  
  infector = new Array();
  final_infector = new Array();
  changed = new Array();
  badge_id=0;
  infection_status=new Array(); // 0=healthy,1=exposed,2=infected
  infection_color=''; // holds state of the infection color
  thestate=0;
  radius=30;
  counter=0;
  cx=0;
  cy=0;
  
  dataset = data.map(function(d) { return [ +d["badge_id"],+d["infector"]]; });
  datalength = dataset.length;
  
  function eliminateDuplicates(arr) {
    var i,
        len=arr.length,
        out=[],
        obj={};
 
    for (i=0;i<len;i++) {
      obj[arr[i]]=0;
    }
    for (i in obj) {
      out.push(i);
    }
    return out;
  }
  
  for(i=0;i<datalength;i++){
  	final_infector=eliminateDuplicates(dataset);
  }
  
  datalength=final_infector.length;
  for(i=0;i<datalength;i++){
  	changed[i] = final_infector[i].split(","); // changed is the array that holds non-duplicate entries of all badges
  }
  
  var svgContainer = d3.select("#dashboard").append("svg")
  	.attr("width", 1130)
  	.attr("height", 500)
  	.attr("class","circleContainer");

  for(i=1;i<datalength;i++){
  	if(changed[i][0]>128){ // if the badge id-128 matches badge_id variable
  		thestate=changed[i][0]-128;
		infection_status[thestate]=1;
  	} else if(changed[i][0]<128) {
  		thestate=changed[i][0];
		infection_status[thestate]=0;
  	}
  }

  while(badge_id<=100){
		
  	if(cx==16){
  		cy = cy+10+radius*2;
  		cx = 0;
  		counter++;
  	}
	
	if(!infection_status[badge_id]){
		infection_status[badge_id]=0;
	}
	
  	if(infection_status[badge_id]==0){
  		infection_color = '#00ad04';
  	} else if (infection_status[badge_id]==1) {
  		infection_color = '#c4b710';
  	} else if (infection_status[badge_id]==2) {
  		infection_color = '#ff0000';
  	}
	
  	xpos = cx*70;

  	var circle = svgContainer.append("circle")
  		.attr("fill","#fff")
  		.attr("stroke","#eee")
  		.attr("stroke-width","5")
  		.attr("cx", xpos+40)
  		.attr("cy", cy+40)
  		.attr("r", radius);
		
  	var innercircle = svgContainer.append("circle")
  		.attr("fill",infection_color)
  		.attr("cx", xpos+40)
  		.attr("cy", cy+40)
  		.attr("r", radius-5);
		
  	svgContainer.append("text")
  		.attr("dx",xpos+40)
  		.attr("dy",cy+43)
  		.attr('text-anchor', 'middle')
  		.attr("class","circleText")
  		.text(badge_id);
		
  	cx++;
  	badge_id++;
  }
});

