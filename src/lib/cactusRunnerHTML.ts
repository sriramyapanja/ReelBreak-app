/**
 * Static T-Rex game: endless run with HI score.
 */
export const gameHTML = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#87CEEB;overflow:hidden;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
#c{display:block;width:100%;height:200px;image-rendering:pixelated;image-rendering:crisp-edges}
</style>
</head>
<body>
<canvas id="c" width="360" height="200"></canvas>
<script>
(function(){
var PX=2,W=360,H=200,GROUND=H-18,G=0.65,J=-11,SPD=6,DW=24,DH=28,CW=22,CH=30,SPAWN_MS=3000,TOTAL_JUMPS_TO_FINISH=3;
var SKY='#87CEEB',GROUND_COL='#C4B8A5',LINE='#8B7355',CLOUD='#FFF',SUN='#F4D03F';
var c=document.getElementById('c'),ctx=c.getContext('2d');
var x=42,y=GROUND-CH-12,vy=0,jumps=0,jumpTotal=0,dinos=[],over=false,good=false,next=0,start=0,started=false,score=0,hi=0;

function cactus(xx,yy){
  var top='#C47B5B',body='#6B8F71',dark='#5A7A60',pot='#B85C38',potD='#9A4A2E';
  yy=Math.floor(yy/PX)*PX;xx=Math.floor(xx/PX)*PX;
  ctx.fillStyle=top;ctx.fillRect(xx+4,yy,14,8);ctx.fillRect(xx+8,yy-4,6,4);
  ctx.fillStyle=body;ctx.fillRect(xx+2,yy+8,18,22);ctx.fillRect(xx,yy+14,6,14);ctx.fillRect(xx+16,yy+16,6,10);
  ctx.fillStyle=dark;ctx.fillRect(xx+8,yy+14,6,10);
  ctx.fillStyle='#2C2416';ctx.fillRect(xx+5,yy+16,4,4);ctx.fillRect(xx+13,yy+16,4,4);
  ctx.fillStyle=pot;ctx.fillRect(xx+2,yy+30,20,10);ctx.fillRect(xx,yy+38,24,6);
  ctx.fillStyle=potD;ctx.fillRect(xx+6,yy+42,12,4);
}
function dino(xx,yy,f,scale){
  scale=scale||1;
  var green='#7D9B6E',dark='#5A6B4A';
  yy=Math.floor(yy/PX)*PX;xx=Math.floor(xx/PX)*PX;
  ctx.save();ctx.translate(xx,yy);ctx.scale(scale,scale);ctx.translate(-xx,-yy);
  ctx.fillStyle=green;
  ctx.fillRect(xx+4,yy+12,14,16);ctx.fillRect(xx+2,yy+4,10,12);ctx.fillRect(xx+16,yy+8,6,8);
  ctx.fillStyle=dark;ctx.fillRect(xx+6,yy+2,8,8);ctx.fillRect(xx+18,yy+20,4,10);
  if(f){ctx.fillRect(xx,yy+26,8,6);ctx.fillRect(xx+14,yy+28,8,4);}else{ctx.fillRect(xx+2,yy+28,8,4);ctx.fillRect(xx+16,yy+26,6,6);}
  ctx.fillStyle='#fff';ctx.fillRect(xx+8,yy+4,4,4);ctx.fillStyle='#2C2416';ctx.fillRect(xx+9,yy+5,2,2);
  ctx.restore();
}
function hit(a,b){return a.x<b.x+b.w&&a.x+CW>b.x&&a.y<b.y+b.h&&a.y+CH>b.y;}
function spawn(t){
  var big=Math.random()>0.5,scale=big?1.2:0.6,w=Math.round(DW*scale),h=Math.round(DH*scale);
  dinos.push({x:W,y:GROUND-h,w:w,h:h,scale:scale});
  next=t+SPAWN_MS;
}
function drawScene(){
  ctx.fillStyle=SKY;ctx.fillRect(0,0,W,H);
  ctx.fillStyle=CLOUD;
  ctx.beginPath();ctx.ellipse(70,50,28,14,0,0,6.28);ctx.ellipse(220,80,36,18,0,0,6.28);ctx.ellipse(320,44,24,12,0,0,6.28);ctx.fill();
  ctx.fillStyle=SUN;ctx.beginPath();ctx.arc(W-28,50,14,0,6.28);ctx.fill();
  ctx.fillStyle=GROUND_COL;ctx.fillRect(0,GROUND,W,H-GROUND);
  ctx.strokeStyle=LINE;ctx.lineWidth=2;ctx.beginPath();
  for(var i=-2;i<W+30;i+=12){if(i===-2)ctx.moveTo(i,GROUND);else ctx.lineTo(i,GROUND);}ctx.stroke();
}
function jump(){
  if(over||good){
    over=false;good=false;dinos=[];y=GROUND-CH-12;vy=0;jumps=0;jumpTotal=0;start=performance.now();started=true;score=0;next=start+SPAWN_MS;return;
  }
  if(!started){started=true;start=performance.now();score=0;jumpTotal=0;next=start+SPAWN_MS;}
  if(jumps<2){vy=J;jumps++;jumpTotal++;if(jumpTotal>=TOTAL_JUMPS_TO_FINISH)good=true;}
}
c.addEventListener('click',function(e){e.preventDefault();jump();});
c.addEventListener('touchstart',function(e){e.preventDefault();jump();},{passive:false});
document.addEventListener('keydown',function(e){if(e.code==='Space'){e.preventDefault();jump();}});
function loop(t){
  drawScene();
  if(good){
    ctx.fillStyle='rgba(255,255,255,0.92)';ctx.fillRect(0,0,W,H);
    ctx.fillStyle='#4A453E';ctx.font='bold 20px system-ui';ctx.textAlign='center';
    ctx.fillText('Good job!',W/2,H/2-8);
    ctx.font='14px system-ui';ctx.fillText('Tap or Space to start again',W/2,H/2+14);
    requestAnimationFrame(loop);return;
  }
  if(over){
    ctx.fillStyle='rgba(255,255,255,0.92)';ctx.fillRect(0,0,W,H);
    ctx.fillStyle='#4A453E';ctx.font='bold 20px system-ui';ctx.textAlign='center';
    ctx.fillText('Game over',W/2,H/2-8);
    ctx.font='14px system-ui';ctx.fillText('Tap or Space to start again',W/2,H/2+14);
    requestAnimationFrame(loop);return;
  }
  if(!started){
    ctx.fillStyle='#4A453E';ctx.font='14px system-ui';ctx.textAlign='center';
    ctx.fillText('Tap Space to jump, avoid the dinos!',W/2,H/2-10);
    requestAnimationFrame(loop);return;
  }
  if(t>=next)spawn(t);
  vy+=G;y+=vy;if(y>=GROUND-CH-12){y=GROUND-CH-12;vy=0;jumps=0;}
  cactus(x,y);
  for(var i=dinos.length-1;i>=0;i--){
    var d=dinos[i];d.x-=SPD;dino(d.x,d.y,Math.floor(t/120)%2===0,d.scale);
    if(hit({x:x,y:y},d))over=true;
    if(d.x+d.w<0)dinos.splice(i,1);
  }
  score=Math.floor((t-start)/100);if(score>hi)hi=score;
  ctx.fillStyle='#5A5548';ctx.font='12px system-ui';ctx.textAlign='right';
  ctx.fillText('HI '+String(hi).padStart(5,'0')+'  '+String(score).padStart(5,'0'),W-10,16);
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
})();
</script>
</body>
</html>
`;
