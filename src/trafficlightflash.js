import React from 'react';
import trafficBG from './trafficBG.png';
import logo from './logo.svg';
import './App.css';

class Trafficlightflash extends React.Component {
  constructor(props){
    super(props);
    this.state={
     station:[]
    }
   
  }
  componentDidMount() {
    this.updateCanvas();
}
  render () {
   const{station}=this.state
    return (
      <div style={{width:500,height:500,position:"relative"}}>
       
       
       <img style={{width:500,height:500,position:"absolute",left:0,top:0}} src={trafficBG} className="trafficBG" alt="trafficBG" />
       <canvas style={{position:"absolute",left:0,top:0}} ref="canvas" width={500} height={500}/>
      </div>
    ) 
  }
  updateCanvas=()=> {
    const ctx = this.refs.canvas.getContext('2d');
    var cvs = this.refs.canvas
    var arr = [
    {x:250, y:400, width:15, height:15,name:'摄像头1'},
    {x:270, y:400, width:15, height:15,name:'摄像头2'}
     ];
     function getEventPosition(ev){
        var x, y;
        if (ev.layerX || ev.layerX == 0) {
          x = ev.layerX;
          y = ev.layerY;
        } else if (ev.offsetX || ev.offsetX == 0) { // Opera
          x = ev.offsetX;
          y = ev.offsetY;
        }
        return {x: x, y: y};
      }
    var img = new Image();
    img.src = logo;
   
     img.onload = function () {
        arr.forEach(function(v, i){
            ctx.drawImage(img,v.x, v.y, v.width, v.height);
          });
       
    };
    this.refs.canvas.addEventListener('click', function (e) {
       var p = getEventPosition(e);
       console.log('0',p)
       draw(p)
      })
      function draw(p){
        var who = [];//保存点击事件包含图形的index值
        ctx.clearRect(0, 0,  cvs.width,  cvs.height);
        arr.forEach(function(v, i){
          ctx.beginPath();
          ctx.drawImage(img,v.x, v.y, v.width, v.height);
          ctx.rect(v.x, v.y, v.width, v.height);
          ctx.stroke();
          if(p && ctx.isPointInPath(p.x, p.y)){
            //如果传入了事件坐标，就用isPointInPath判断一下
            //如果当前环境覆盖了该坐标，就将图形的index放到数组里
            who.push(v.name);
          }
        });
        //根据数组中的index值，可以到arr数组中找到相应的元素。
        console.log(who)
    }
}
}

export default Trafficlightflash;