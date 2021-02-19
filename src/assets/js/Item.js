const START_ANGLE=30;
const ANG_DIFF=10;
const SPEED_FAC= ANG_DIFF*.2;


let TOP_LIMIT=0;
let BOTTOM_LIMIT=0;
class Item{
    constructor()
    {
        this.x        = 0;
        this.y        = 0;
        this.ang      = 0;
        this.mSel     = -1;
        this.mItemRot = 0;
    }
    Set(_cx,_cy,_ang)
    {
        this.ang    = _ang;
        var rad     =  DegreeToRadian(this.ang);
        let xfac    = mCircle.radius*1.1;
        let xx      = _cx-(Math.cos(rad)*xfac);
        this.x      = parseFloat(xx.toFixed(2));
        // let yfac    = mCircle.radius*1.77;   
        // let yy      = _cy+(Math.sin(rad)*yfac);
        // this.y      =  parseFloat(yy.toFixed(2));

        this.y          = _cy+this.ang*.03;
        let ang_fax     = ANG_DIFF*.07;
        this.mItemRot   = this.ang*ang_fax;
        // console.log("!!! X !!! "+this.x+" !!! Y !!! "+this.y+"!!! Ang!!! "+this.ang+"     ");
    }
    Set2(_cx)
    {
        let xfac    = mCircle.radius*1.1;
        var rad     =  DegreeToRadian(this.ang);
        let xx      = _cx-(Math.cos(rad)*xfac);
        this.x      = parseFloat(xx.toFixed(2));
    }
    Update(_cx,_cy,_xspd)
    {
            
            this.ang    += _xspd;
            var rad     =  DegreeToRadian(this.ang);
            let xfac    =  mCircle.radius*1.1;
            let xx      =  _cx-(Math.cos(rad)*xfac);
            this.x      =  parseFloat(xx.toFixed(2));

            
            // let yfac        = mCircle.radius*1.77;   
            // let yy          = _cy+(Math.sin(rad)*yfac);
            // this.y          =  parseFloat(yy.toFixed(2));
            this.y          = _cy+this.ang*.03;
            let ang_fax     = ANG_DIFF*.07;
            this.mItemRot   = this.ang*ang_fax;
    }
}