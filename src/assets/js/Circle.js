class CirlcleView{
     constructor()
     {
         this.x = 0;
         this.y = 0;
         this.startAng=0;
         this.spd=0;
         this.alpha=1;
         this.radius=0;
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