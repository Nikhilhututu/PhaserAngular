
let  mRenderTex;
let  mText;
let  mTex_Logo,mTex_Btn,mTex_Item=[],mTex_Bg,mTex_Up,mTex_Down,mTex_SldeIn,mTex_SldeOut;
let  Snd_Over;
let  mCamera;
let maxX=0,maxY=0;

let GameScreen=0,mSel=0;
let TEST=100,outPos=-100;
let setMusic=true;
let Counter=0;
const GAMELOGO = 0,GAMEPLAY = 1;
let mCircle,mItem=[];
let isTouch=false,_MoveType=-1;
let isKeyPress=false;
class GameScene extends Phaser.Scene {

	constructor ()
    {
        super('GameScene');
    }
	preload()
	{
		console.log("in game");
	}
	create()
	{
		
		checkOriention(this.game,this.scale.orientation);
		
		this.scale.on('orientationchange', checkOriention, this);
		this.input.on('pointerdown', function (pointer) {
			HandleEvent(0, pointer);
		}, this);
		this.input.on('pointermove', function (pointer) {
			HandleEvent(1, pointer);
			
		}, this);
		this.input.on('pointerup', function (pointer) {
			HandleEvent(2, pointer);
		}, this);

		
		
		InitObj();
	}
	update()
	{
		mRenderTex.clear();
		switch (GameScreen) {
			case GAMELOGO:
				DrawTexture(mTex_Logo,0,0);
				if(Counter>50)
				{
					GameScreen = GAMEPLAY;
					Counter=0;
				}
				break;
			case GAMEPLAY:
				DrawGamePlay();
				break;
			
		}
		Counter++;
	}

}

function HandleEvent(events, pointer) {
	switch (GameScreen) {
		case GAMEPLAY:
			Handle_Gameplay(events, pointer);
			break;
	}
}


function DrawGamePlay()
{
	DrawTexture(mTex_Bg,0,0);
	DrawTransScal(mTex_Up,-.85,-.85,mSel===1?2.1:2,1);
	DrawTransScal(mTex_Down,.1,-.85,mSel===2?2.1:2,1);
	DrawTransScal(mTex_SldeIn,-.5,-.85,mSel===3?1.1:1,1);
	DrawTransScal(mTex_SldeOut,-.2,-.85,mSel===4?1.1:1,1);

	
	for(let i=0;i<mItem.length;i++)
	{

		
		DrawTranScalR(mTex_Btn,mItem[i].x,mItem[i].y,1.7,mCircle.alpha,mItem[i].mItemRot);
		DrawTranScalR(mTex_Item[i%mTex_Item.length],mItem[i].x,mItem[i].y,.75,mCircle.alpha,mItem[i].mItemRot);


		// console.log("   "+mItem[i].x+"        "+mItem[i].y)
	}
	if(mSelect>-1)
	{
		DrawTranScalR(mTex_Btn,mItem[mSelect].x,.05,2.3,mCircle.alpha,mItem[mSelect].mItemRot);
		DrawTranScalR(mTex_Item[mSelect%mTex_Item.length],mItem[mSelect].x,.05,1,mCircle.alpha,mItem[mSelect].mItemRot);
	}

	
	// for(let i=0;i<mItem.length;i++)
	// {
		
	// 	DrawTextColor(mText,i+"",mItem[i].x,mItem[i].y,255,0,0,1);
	// }
	
	GameLogic();
	
	TWEEN.update();
	
	
	 
}
function GameLogic()
{
	
	if(isKeyPress || isTouch || mISScroll)
	{
		
		Move();
	}
	
	for(let i=0;i<mItem.length && mCircle.spd!==0 ;i++)
	{
		if(mItem[i].ang>TOP_LIMIT)
		{
			let val = BottomItem();
			mItem[i].Set(mCircle.x,mCircle.y,val[1]-ANG_DIFF);
		}
	}
	for(let i=0;i<mItem.length && mCircle.spd!==0 ;i++)
	{
		
		if(mItem[i].ang<BOTTOM_LIMIT)
		{
			// console.log("!!!Bottom!! "+i+"     "+mItem[i].y);
			let val = TopItem();
			mItem[i].Set(mCircle.x,mCircle.y,val[1]+ANG_DIFF);
		}
	}
}
let mScrollTY=0
let mISScroll = false;
function Handle_Gameplay(event,pointer)
{
	mSel=0;
	if(CircRectsOverlap(-.85, -.85, floatWidth(mTex_Down.width)*.5,floatHeight(mTex_Down.height)*.45,screen2worldX(pointer.x),screen2worldY(pointer.y),.05)){
		mSel = 1;//up
		if(event===0)
		{
	
			if(!isTouch)
			{
				isTouch=true;
				_MoveType=0;	
				if(mCirMove !==0)
					mCirMove =0;
			}

		}

	}
	if(CircRectsOverlap(.1, -.85, floatWidth(mTex_Down.width)*.5,floatHeight(mTex_Down.height)*.5,screen2worldX(pointer.x),screen2worldY(pointer.y),.05)){
		mSel = 2;//down
		if(event===0)
		{
			if(!isTouch)
			{
				isTouch=true;
				_MoveType=1;
				if(mCirMove !==0)
					mCirMove =0;
			}
		}
	}
	
	if(CircRectsOverlap(-.5, -.85, floatWidth(mTex_SldeIn.width)*.5,floatHeight(mTex_SldeIn.height)*.5,screen2worldX(pointer.x),screen2worldY(pointer.y),.05)){
		mSel = 3;//slidein
	}
	if(CircRectsOverlap(-.2, -.85, floatWidth(mTex_SldeIn.width)*.5,floatHeight(mTex_SldeIn.height)*.5,screen2worldX(pointer.x),screen2worldY(pointer.y),.05)){
		mSel = 4;//slideout
	}
	if (mSel === 0 ) {
		if (event === 0) {
			mScrollTY = screen2worldY(pointer.y);
			if(!mISScroll)
				mISScroll = true;
			
		}
		if (event === 1 && mISScroll && mCirMove===0  && mCircle.x<1.5) {

			if (mScrollTY < screen2worldY(pointer.y)) {
				_MoveType=0;
				if(mCirMove !==0)
				 	mCirMove =0;
				mScrollTY = screen2worldY(pointer.y);
				// if(Counter%2==0)
				//  CheckCollide();
				console.log("In Positiveee");
			}
			if (mScrollTY > screen2worldY(pointer.y)) {
				_MoveType=1;
				if(mCirMove !==0)
				 	mCirMove =0;
				mScrollTY = screen2worldY(pointer.y);
				// if(Counter%2==0)
				//  	CheckCollide();
				console.log("In negativeee");
			}
			
		}
	}
	if(event ===2)
	{
		switch(mSel)
		{
			case 3:
				SlideIn();
				break;
			case 4:
				SlideOut();
				break;
		}
		mSel=0;
	}
}

let mCirMove=0;
let val=0; 
function Move()
{
	if(GameScreen === GAMEPLAY && _MoveType>-1)
	{
	
		if(mCircle.x<1.5)
		{
			// if(SPEED_FAC>ANG_DIFF)
			// 	SPEED_FAC = ANG_DIFF;
			
			if(mCirMove ===0)
			 	val  = _MoveType===0?SPEED_FAC:-SPEED_FAC;
				 
				mCirMove +=val;
			 
			if(Math.abs(mCirMove)>=(ANG_DIFF))
			{
				
				CheckCollide();
				mCircle.spd=0;
				if(isTouch && mSel!==0)
				{
					mCirMove=0;
				}
				if(isKeyPress || mSel===0 || mISScroll)
				{
					isKeyPress = false;
					isTouch    = false;
					mCirMove=0;
					mISScroll = false;
				}
			}
			else
			{
				mSelect=-1;
			}
			mCircle.spd = val;
			// console.log("!!!SPD!! "+mCircle.spd);
			for(let i=0;i<mItem.length;i++)
				mItem[i].Update(mCircle.x,mCircle.y,mCircle.spd,0);
			
			}
		}
}
function FadIn()
{
	console.log("##########"+"    "+speed.ySpd);
	if(mCircle.alpha ===1 && speed.ySpd ===0)
	{
		let fadIn={alpha:1};
		new TWEEN.Tween(fadIn).to({alpha :.25}
				,500).easing(TWEEN.Easing.Quartic.In).onUpdate(()=>{
					if(speed.ySpd===0)
					{
						console.log("%%%%"+mCircle.spd+"    "+speed.ySpd);
						mCircle.alpha=fadIn.alpha;
					}
					else	
						mCircle.alpha =1;
				}).onComplete(()=>{
					// complete
					// console.log("!!!! Complete Spdded!!!!"+"      "+mCircle.spd);
		}).start();
	}
}
function SlideOut()
{
	let slide ={x:mCircle.x}
	console.log("out"+mCircle.x)
	if(GameScreen === GAMEPLAY)
	{
		if(mCircle.x<1.5)
		{
			new TWEEN.Tween(slide).to({x:2.5}
				,500).easing(TWEEN.Easing.Back.In).onUpdate(() => {
						mCircle.x = slide.x;
						for(let i=0;i<mItem.length;i++)
							mItem[i].Set2(mCircle.x);
					})
					.onComplete(() => {
						// complete
						// console.log("!!!! Complete Spdded!!!!"+"      "+mCircle.spd);
			}).start();
		}
	}
}
function SlideIn()
{
	let slide ={x:mCircle.x,dx:0}
	if(GameScreen === GAMEPLAY)
	{
		if(mCircle.x>1.5)
		{
			new TWEEN.Tween(slide)
				.to({x :1.4},500).easing(TWEEN.Easing.Back.InOut)
					.onUpdate(() => {
						mCircle.x = slide.x;
						for(let i=0;i<mItem.length;i++)
						{
							mItem[i].Set2(mCircle.x);
						}
						// console.log("!!!! onUpdate!!!!"+"      "+mCircle.x);
					})
					.onComplete(() => {
						// complete
						// console.log("!!!! Complete Spdded!!!!"+"      "+mCircle.spd);
						
			}).start();
		}
	}
}

let mSelect=-1;
function CheckCollide()
{
	for(let i=0;i<mItem.length;i++)
	{
		// if(mItem[i].mItemRot<10 && mItem[i].mItemRot>0)
			// if(intersects(0,0,mCircle.x,0,0,mItem[i].x,mItem[i].y))
			// if(lineRect(0,0,mCircle.x,0,0,mItem[i].y,floatWidth(mTex_Btn.width),floatHeight(mTex_Btn.height)))
			let _xx      = Math.cos(DegreeToRadian(0))*mCircle.radius; 
			let _x = mCircle.x-_xx;
			if(CircRectsOverlap(_x,0,floatWidth(mTex_Btn.width)*.5,floatHeight(mTex_Btn.height)*.25,mItem[i].x,mItem[i].y,.1))
			{
				mSelect = i;
			}
	}
}

function TopItem()
{
	let val=[];
	val[0] = mItem[0].y;
	val[1] = mItem[0].ang;
	for(let i=0;i<mItem.length;i++)
	{
		if(mItem[i].ang>val[1])
		{
			val[0] = mItem[i].y;
			val[1] = mItem[i].ang;
		}
	}
	
	return val;

}
function BottomItem()
{
	let val=[];
	val[0] = mItem[0].y;
	val[1] = mItem[0].ang;
	for(let i=0;i<mItem.length;i++)
	{
		if(mItem[i].ang<val[1])
		{
			val[0] = mItem[i].y;
			val[1] = mItem[i].ang;
		}
	}
	return val;

}
function GameReset()
{
	mCircle.Set(1.4,0,.7,START_ANGLE);
	
	for(let i=0;i<mItem.length;i++)
	{
		let _ang  = mCircle.startAng-(i*ANG_DIFF);
		mItem[i].Set(mCircle.x,mCircle.y,_ang);
		// console.log(i+"  !!ANG!! "+mItem[i].ang+"!!XX!!"+mItem[i].x+"!! YY!!"+mItem[i].y);
	}	
	TOP_LIMIT	 = mItem[0].ang;
	BOTTOM_LIMIT = mItem[mItem.length-1].ang;
	console.log(" !!BOTTOM!! "+BOTTOM_LIMIT+" !!TOP!! "+TOP_LIMIT);
	CheckCollide();
}
function InitObj()
{
	for(let i=0;i<50;i++)
		mItem[i] = new Item();

	mCircle = new CirlcleView();	
	GameReset();
}
function rgbToHex(r, g, b){
	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
 }
function DrawNumber(no,x, y) {
	let dx = floatWidth(mTex_Font[0].width*.5);
	let strs = "" + no;
	for (let i = 0; i < strs.length; i++) {
		let k = (strs.charAt(i));
		if (k >= 0 && k < mTex_Font.length)
			DrawTexture(mTex_Font[k],x + i * dx, y);
			// mTex_Font[k].drawPos( x + i * dx, y);
	}
}
function XPos(x) {
	return (((1 + x) * maxX) / 2);
}
function YPos(y) {
	return (((1 - (y)) * maxY) / 2);
}
function DrawText(Font,strs, x, y) {
	Font.setText(strs);
	var color = rgbToHex(255, 255, 255);
	Font.setColor(color);
	Font.alpha = 1;
	Font.angle = 0;
	Font.setScale(1);
	mRenderTex.draw(Font, XPos(x), YPos(y));
}
function DrawTextR(Font,strs, x, y,ang) {
	Font.setText(strs);
	var color = rgbToHex(255, 255, 255);
	Font.setColor(color);
	Font.alpha = 1;
	Font.angle = ang;
	Font.setScale(1);
	mRenderTex.draw(Font, XPos(x), YPos(y));
}
function DrawTextScalAlpha(Font, strs, x, y, s,a) {
	Font.setText(strs);
	var color = rgbToHex(255, 255, 255);
	Font.setColor(color);
	Font.alpha = a;
	Font.setScale(s);
	mRenderTex.draw(Font, XPos(x), YPos(y));
}

function DrawTextColor(Font, strs, x, y, r, g, b, a) {
	var color = rgbToHex(r, g, b);
	Font.setColor(color);
	Font.setText(strs);
	Font.alpha = a;
	Font.setScale(1);
	mRenderTex.draw(Font, XPos(x), YPos(y));
}
function DrawTextColorScal(Font, strs, x, y,s,r,g,b) {
	Font.setText(strs);
	var clr = rgbToHex(r, g, b);
	Font.setColor(clr);
	Font.alpha = 1;
	Font.setScale(s);
	mRenderTex.draw(Font, XPos(x), YPos(y));
}
function DrawTexture(img, x, y) {
	var hex = (255 * 0x010000) + (255 * 0x000100) + (255 * 0x000001);
	img.tint = hex;
	img.alpha = 1;
	img.angle = 0;
	img.setScale(1,1);
	mRenderTex.draw(img, XPos(x), YPos(y));

}
function DrawTextureSS(img, x, y, sx, sy) {
	var hex = (255 * 0x010000) + (255 * 0x000100) + (255 * 0x000001);
	img.tint = hex;
	img.alpha = 1;
	img.angle = 0;
	img.flipX = false;
	img.scaleX = sx;
	img.scaleY = sy;
	mRenderTex.draw(img, XPos(x), YPos(y));
}
function DrawTransScal(img, x, y, s, t) {
	var hex = (255 * 0x010000) + (255 * 0x000100) + (255 * 0x000001);
	img.tint = hex;
	img.alpha = t;
	img.angle = 0;
	img.setScale(s,s);
	mRenderTex.draw(img, XPos(x), YPos(y));
}
function DrawTextureFlip(img, x, y,isflipX, isflipY) {
	var hex = (255 * 0x010000) + (255 * 0x000100) + (255 * 0x000001);
	img.tint = hex;
	img.alpha = 1;
	img.setScale(1,1);
	img.flipX = isflipX;
	img.flipY = isflipY;
	img.angle = 0;
	mRenderTex.draw(img, XPos(x), YPos(y));

}
function DrawTranScalR(img, x, y, s, t, r) {
	var hex = (255 * 0x010000) + (255 * 0x000100) + (255 * 0x000001);
	img.tint = hex;
	img.alpha = t;
	img.setAngle(r);
	img.setScale(s,s);
	mRenderTex.draw(img, XPos(x), YPos(y));
}
function DrawTextureR(img, x, y, r) {
	var hex = (255 * 0x010000) + (255 * 0x000100) + (255 * 0x000001);
	img.tint = hex;
	img.alpha = 1;
	img.setScale(1,1);
	img.flipX = false;
	img.flipY = false;
	img.angle = r;
	
	mRenderTex.draw(img, XPos(x), YPos(y));
}
function DrawTexColor(img, x, y, r, g, b) {
	var hex = (r * 0x010000) + (g * 0x000100) + (b * 0x000001);
	img.tint = hex;
	img.alpha=1;
	img.angle = 1;
	img.setScale(1,1);
	mRenderTex.draw(img, XPos(x), YPos(y));

}
function DrawTexColorScal(img, x, y, r, g, b,sx,sy) {
	var hex = (r * 0x010000) + (g * 0x000100) + (b * 0x000001);
	img.setTint(hex);
	img.alpha=1;
	img.angle = 1;
	img.setScale(sx,sy);
	mRenderTex.draw(img, XPos(x), YPos(y));

}
function DrawTextureRS(img, x, y, s, r) {
	var hex = (255 * 0x010000) + (255 * 0x000100) + (255 * 0x000001);
	img.tint = hex;
	img.alpha = 1;
	img.angle = r;
	img.setScale(s,.5);
	mRenderTex.draw(img, XPos(x), YPos(y));
}
function DrawTextureRTS(img, x, y, s, ang, r, g, b, alpha) {
	var hex = ((r * 255) * 0x010000) + ((g * 255) * 0x000100) + ((b * 255) * 0x000001);
	img.tint = hex;
	img.alpha = alpha;
	img.angle = ang;
	img.setScale(s,s);
	mRenderTex.draw(img, XPos(x), YPos(y));
}

function DegreeToRadian(d) {
	var r = d * (Math.PI / 180);
	return r;
}
function RadianToDegree(r) {
	var d = r * (180 / Math.PI);
	return d;
}
function GetAngle(d, e) {

	if (d == 0)
		return e >= 0 ? Math.PI / 2 : -Math.PI / 2;
	else if (d > 0)
		return Math.atan(e / d);
	else
		return Math.atan(e / d) + Math.PI;

}
function RandomBoolean() {
	let r = RandomInt(0,1);
	if (r < 1)
		return false;
	else
		return true;
}
function RandomInt(min, max) {
	// return Math.floor(Math.random() * (max - min + 1) + min);
	return Phaser.Math.Between(min, max);
}
function Dist(x1,y1,x2,y2){ 
	if(!x2) x2=0; 
	if(!y2) y2=0;
	return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)); 
  }
function Randomfloat(min, max) {

	var rnd = Phaser.Math.RND;
	let value = rnd.frac();
	max = max - min;
	max = value % max;
	return (max + min);
}
function lineRect(x1, y1, x2, y2, rx,  ry, rw,rh) {

	
	var left 	=  lineLine(x1,y1,x2,y2, rx,ry,rx, ry+rh);
	var right 	=  lineLine(x1,y1,x2,y2, rx+rw,ry, rx+rw,ry+rh);
	var top 	=  lineLine(x1,y1,x2,y2, rx,ry, rx+rw,ry);
	var bottom  =  lineLine(x1,y1,x2,y2, rx,ry+rh, rx+rw,ry+rh);
  
	// if ANY of the above are true, the line
	// has hit the rectangle
	if (left || right || top || bottom) {
	  return true;
	}
	return false;
}
function lineLine(x1, y1, x2, y2, x3, y3,  x4, y4) {

	// calculate the direction of the lines
	var uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
	var uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
  
	// if uA and uB are between 0-1, lines are colliding
	if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
  
	  // optionally, draw a circle where the lines meet
	//   var intersectionX = x1 + (uA * (x2-x1));
	//   var intersectionY = y1 + (uA * (y2-y1));
	//   fill(255,0,0);
	//   noStroke();
	//   ellipse(intersectionX, intersectionY, 20, 20);
  
	  return true;
	}
	return false;
  }
function checkOverlap(spriteA, spriteB) {

	var boundsA = spriteA.getBounds();
	var boundsB = spriteB.getBounds();

	return Phaser.Rectane.varersects(boundsA, boundsB);
}
function CirCir(cx1, cy1, r1, cx2, cy2, r2) {
	var bVectMag = Math.sqrt(((cx1 - cx2) * (cx1 - cx2)) + ((cy1 - cy2) * (cy1 - cy2)));
	if (bVectMag < (r1 + r2))
		return true;
	return false;
}

function floatHeight(Height) {
	return (Height / maxY) * 2;
}
function floatWidth(Width) {
	return (Width / maxX) * 2;
}
function screen2worldX(a) {
	c = ((a / maxX) - 0.5) * 2;
	return c;
}
function screen2worldY(a) {
	c = ((a / maxY) - 0.5) * (-2);
	return c;
}
function Rect2RectIntersection(ax,ay, adx, ady, bx, by,bdx,bdy)
{
	ax -= adx/2;
	ay += ady/2;
	bx -= bdx/2;
	by += bdy/2;
	if( ax+adx > bx  && ay-ady < by && bx+bdx > ax && by-bdy< ay)
	{
		return true;
	}
	return false;
}
function intersects(a,b,c,d,p,q,r,s) {
	var det, gamma, lambda;
	det = (c - a) * (s - q) - (r - p) * (d - b);
	if (det === 0) {
	  return false;
	} else {
	  lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
	  gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
	  return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
	}
  };
function Rect2Rectvarersection(ax, ay, adx, ady, bx, by, bdx, bdy) {
	ax -= adx / 2;
	ay += ady / 2;
	bx -= bdx / 2;
	by += bdy / 2;
	if (ax + adx > bx && ay - ady < by && bx + bdx > ax && by - bdy < ay) {
		return true;
	}
	return false;
}
function CircRectsOverlap(CRX, CRY, CRDX, CRDY, centerX, centerY, radius) {
	if ((Math.abs(centerX - CRX) <= (CRDX + radius)) && (Math.abs(centerY - CRY) <= (CRDY + radius)))
		return true;

	return false;
}
function checkOriention(game,orientation) {
	if (orientation === Phaser.Scale.PORTRAIT) {

		
		if(!game.device.os.desktop)
		{
			document.getElementById("turn").style.display = "block";
			
			console.log("Phaser.Scale.PORTRAIT");
		}
	}
	else if (orientation === Phaser.Scale.LANDSCAPE) {

		if(!game.device.os.desktop)
		{
			document.getElementById("turn").style.display = "none";
			console.log("Phaser.Scale.LANDSCAPE");
		}
	}
}