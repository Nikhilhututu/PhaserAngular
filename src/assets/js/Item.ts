

let mGameScene;
export class Item{
    x        = 0;
    y        = 0;
    ang      = 0;
    mSel     = -1;
    mItemRot = 0;
    static START_ANGLE=50;
    static ANG_DIFF=10;
    static SPEED_FAC = Item.ANG_DIFF*.25;
    static TOP_LIMIT=0;
    static BOTTOM_LIMIT=0;
    constructor()
    {
    }
    Set(_cx,_cy,_ang,_radius)
    {
        this.ang    = _ang;
        var rad     = mGameScene.DegreeToRadian(this.ang);
        let xfac    = _radius*1.1;
        let xx      = _cx-(Math.cos(rad)*xfac);
        this.x      = parseFloat(xx.toFixed(2));
        this.y          = _cy+this.ang*.03;
        let ang_fax     = Item.ANG_DIFF*.08;
        this.mItemRot   = this.ang*ang_fax;
        // console.log("!!! X !!! "+this.x+" !!! Y !!! "+this.y+"!!! Ang!!! "+this.ang+"     ");
    }
    Set2(_cx,_radius)
    {
        let xfac    = _radius*1.1;
        var rad     =  mGameScene.DegreeToRadian(this.ang);
        let xx      =  _cx-(Math.cos(rad)*xfac);
        this.x      =  parseFloat(xx.toFixed(2));
    }
    Update(_cx,_cy,_xspd,_radius)
    {
            
            this.ang        += _xspd;
            var rad         =  mGameScene.DegreeToRadian(this.ang);
            let xfac        = _radius*1.1;
            let xx          =  _cx-(Math.cos(rad)*xfac);
            this.x          =  parseFloat(xx.toFixed(2));
            this.y          =  _cy+this.ang*.03;
            let ang_fax     =  Item.ANG_DIFF*.08;
            this.mItemRot   =  this.ang*ang_fax;
    }
}
export function GetGame(_gamescene)
{
    mGameScene = _gamescene; 
}
