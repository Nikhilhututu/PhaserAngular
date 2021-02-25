
class CirlcleView{
     x = 0;
     y = 0;
     startAng=0;
     spd=0;
     alpha=1;
     radius=0;
     constructor()
     {
         
     }
     Set(_x,_y,_radius,_startang)
     {
        this.x = _x;
        this.y = _y;
        this.startAng = _startang;
        this.radius   = _radius;
        this.spd   = 0;
        this.alpha = 1;
     }
}
export default CirlcleView