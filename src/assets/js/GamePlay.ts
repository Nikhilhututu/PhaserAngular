
import TWEEN  from '../../assets/js/tween.umd';
import CirlcleView from '../../assets/js/Circle';
import {Item} from '../../assets/js/Item';
import {GetGame} from '../../assets/js/Item';


let mSel=0,mScrollTY=0
let mISScroll = false,isTouch=false,isKeyPress=false;
let _MoveType=-1,mSelect=-1,mCirMove=0;
let mSpdval=0; 
let mRenderTex:any;
let mCircle,mItem=[];
let Counter=0,maxX=0,maxY=0;
let GameScreen=0;
let setMusic:boolean = false;
 
const GAMELOGO = 0,GAMEPLAY = 1;

 class GameScene extends Phaser.Scene {
	mText;
	mTex_Logo;mTex_Btn;mTex_Item=[];mTex_Bg;mTex_Up;mTex_Down;mTex_SldeIn;mTex_SldeOut;
	Snd_Over;
	
	static mListData:any;
	constructor ()
    {
        super('GameScene');
		for(let i=0;i<GameScene.mListData.length;i++)
		{
			console.log(GameScene.mListData[i].Name+" !!! Location!!  "+GameScene.mListData[i].WheelLocation+"     !!id!!  "+GameScene.mListData[i].Id);
		}
		// console.log(GameScene.mListData);
		
    }
	preload()
	{
		this.cameras.main.setBackgroundColor("#000");
		LoadImage(this.load,'logo.png');
		LoadImage(this.load,'btn.png');
		LoadImage(this.load,'bg.png');
		LoadImage(this.load,'up.png');
		LoadImage(this.load,'down.png');
		LoadImage(this.load,'slidein.png');
		LoadImage(this.load,'slideout.png');

		for(let i=0;i<GameScene.mListData.length;i++)
		{
			LoadImage2(this.load,GameScene.mListData[i].WheelLocation);	
		}

		// LoadImage(this.load,'AcrobatMission.png');
		// LoadImage(this.load,'3NinjasKickBack.png');
		// LoadImage(this.load,'7thSagaThe.png');
		// LoadImage(this.load,'90MinutesEuropeanPrimeGoal.png');
		// LoadImage(this.load,'2020SuperBaseball.png');
		// LoadImage(this.load,'AaahhRealMonsters.png');
		// LoadImage(this.load,'ABCMondayNightFootball.png');
		// LoadImage(this.load,'AcceleBrid.png');
		// LoadImage(this.load,'AceoNerae.png');
		// LoadImage(this.load,'ACMEAnimationFactory.png');
		// LoadImage(this.load,'AcrobatMission.png');


		//this.load.audio('gameover' , './assets/sound/gameover.mp3'); load sound

		this.load.on('progress', function (value) {
			let val = value * 100;
			document.getElementById('load_txt').textContent = val.toFixed(2)+"%";
		});
		this.load.on('fileprogress', function (file) {

		});
		this.load.on('complete', function () {
			// console.log('!!Load complete!!!');
		});
		
		maxX = Number(this.game.config.width);
		maxY = Number(this.game.config.height);
		console.log(" Game scwnw preload "+maxX+"     ");

	}
	create()
	{
		Counter=0;
		this.mText = this.add.text(XPos(100),YPos(100), " ", { fontFamily: 'Carton_Six', align: 'center', fontSize: '96px', color: '#fff' });
		this.mText.setOrigin(.5, .5);
		this.mTex_Logo      =   GetImage(this.add,'logo.png');
		this.mTex_Btn  		=   GetImage(this.add,'btn.png');
		this.mTex_Bg     	=	GetImage(this.add,'bg.png');
		this.mTex_Up     	=	GetImage(this.add,'up.png');
		this.mTex_Down   	=	GetImage(this.add,'down.png');
		this.mTex_SldeIn 	=   GetImage(this.add,'slidein.png');
		this.mTex_SldeOut 	= 	GetImage(this.add,'slideout.png');
		for(let i=0;i<GameScene.mListData.length;i++)
		{
			this.mTex_Item.push(GetImage2(this.add,GameScene.mListData[i].WheelLocation));
		}
		
		// this.mTex_Item.push(GetImage(this.add,'3NinjasKickBack.png'));
		// this.mTex_Item.push(GetImage(this.add,'7thSagaThe.png'));
		// this.mTex_Item.push(GetImage(this.add,'90MinutesEuropeanPrimeGoal.png'));
		// this.mTex_Item.push(GetImage(this.add,'2020SuperBaseball.png'));
		// this.mTex_Item.push(GetImage(this.add,'AaahhRealMonsters.png'));
		// this.mTex_Item.push(GetImage(this.add,'ABCMondayNightFootball.png'));
		// this.mTex_Item.push(GetImage(this.add,'AcceleBrid.png'));
		// this.mTex_Item.push(GetImage(this.add,'AceoNerae.png'));
		// this.mTex_Item.push(GetImage(this.add,'ACMEAnimationFactory.png'));
		// this.mTex_Item.push(GetImage(this.add,'AcrobatMission.png'));

		mRenderTex = this.add.renderTexture(0, 0, maxX,maxY);
		mRenderTex.setDepth(0);
		GameScreen =GAMELOGO;	
		this.checkOriention(this.game,this.scale.orientation);
		
		this.scale.on('orientationchange', this.checkOriention,this);
		this.input.on('pointerdown', function (pointer) {
			this.HandleEvent(0, pointer);
		}, this);
		this.input.on('pointermove', function (pointer) {
			this.HandleEvent(1, pointer);
			
		}, this);
		this.input.on('pointerup', function (pointer) {
			this.HandleEvent(2, pointer);
		}, this);
		console.log("  !!! Game Create!!! ");
		this.InitObj();
		document.getElementById("loaderbg").style.display = "none";
	}
	update()
	{
		mRenderTex.clear();
		switch (GameScreen) {
			case GAMELOGO:
				DrawTexture(this.mTex_Logo,0,0);
				if(Counter>50)
				{
					GameScreen = GAMEPLAY;
					Counter=0;
				}
				break;
			case GAMEPLAY:
				this.DrawGamePlay();
				break;
			
		}
		Counter++;
	}
	
	checkOriention(game,orientation) {
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
   HandleEvent(events, pointer) {
		switch (GameScreen) {
			case GAMEPLAY:
				this.Handle_Gameplay(events, pointer);
				break;
		}
	}
	DrawGamePlay()
	{
		DrawTexture(this.mTex_Bg,0,0);
		DrawTransScal(this.mTex_Up,-.85,-.85,mSel===1?2.1:2,1);
		DrawTransScal(this.mTex_Down,.1,-.85,mSel===2?2.1:2,1);
		DrawTransScal(this.mTex_SldeIn,-.5,-.85,mSel===3?1.1:1,1);
		DrawTransScal(this.mTex_SldeOut,-.2,-.85,mSel===4?1.1:1,1);

		
		for(let i=0;i<mItem.length;i++)
		{

			
			DrawTranScalR(this.mTex_Btn,mItem[i].x,mItem[i].y,1.7,mCircle.alpha,mItem[i].mItemRot);
			DrawTranScalR(this.mTex_Item[i%this.mTex_Item.length],mItem[i].x,mItem[i].y,.75,mCircle.alpha,mItem[i].mItemRot);


			// console.log("   "+mItem[i].x+"        "+mItem[i].y)
		}
		if(mSelect>-1)
		{
			DrawTranScalR(this.mTex_Btn,mItem[mSelect].x,.05,2.3,mCircle.alpha,mItem[mSelect].mItemRot);
			DrawTranScalR(this.mTex_Item[mSelect%this.mTex_Item.length],mItem[mSelect].x,.05,1,mCircle.alpha,mItem[mSelect].mItemRot);
		}

		
		// for(let i=0;i<mItem.length;i++)
		// {
			
		// 	DrawTextColor(mText,i+"",mItem[i].x,mItem[i].y,255,0,0,1);
		// }
		this.GameLogic();
		TWEEN.update();
	}
	GameLogic()
	{
		
		if(isKeyPress || isTouch || mISScroll)
		{
			this.Move();
		}
		
		for(let i=0;i<mItem.length && mCircle.spd!==0 ;i++)
		{
			if(mItem[i].ang>Item.TOP_LIMIT)
			{
				let val = this.BottomItem();
				mItem[i].Set(mCircle.x,mCircle.y,val[1]-Item.ANG_DIFF,mCircle.radius);
			}
		}
		for(let i=0;i<mItem.length && mCircle.spd!==0 ;i++)
		{
			
			if(mItem[i].ang<Item.BOTTOM_LIMIT)
			{
				// console.log("!!!Bottom!! "+i+"     "+mItem[i].y);
				let val = this.TopItem();
				mItem[i].Set(mCircle.x,mCircle.y,val[1]+Item.ANG_DIFF,mCircle.radius);
			}
		}
	}
	GameReset()
	{
		mCircle.Set(1.4,0,.8,Item.START_ANGLE);
		
		console.log(" !!!! GameREset!!!"+mItem.length);
		for(let i=0;i<mItem.length;i++)
		{
			let _ang  = mCircle.startAng-(i*Item.ANG_DIFF);
			mItem[i].Set(mCircle.x,mCircle.y,_ang,mCircle.radius);
			// console.log(i+"  !!ANG!! "+mItem[i].ang+"!!XX!!"+mItem[i].x+"!! YY!!"+mItem[i].y);
		}	
		Item.TOP_LIMIT	 = mItem[0].ang;
		Item.BOTTOM_LIMIT = mItem[mItem.length-1].ang;
		console.log(" !!BOTTOM!! "+Item.BOTTOM_LIMIT+" !!TOP!! "+Item.TOP_LIMIT);
		this.CheckCollide();
	}
	InitObj()
	{
		mCircle = new CirlcleView();	
		for(let i=0;i<GameScene.mListData.length;i++)
		mItem[i] = new Item();
			
		GetGame(this);
		this.GameReset();
		
	}
	CheckCollide()
	{
		for(let i=0;i<mItem.length;i++)
		{
			let _xx      = Math.cos(this.DegreeToRadian(0))*mCircle.radius; 
			let _x = mCircle.x-_xx;
			if(CircRectsOverlap(_x,mCircle.y,floatWidth(this.mTex_Btn.width)*.5,floatHeight(this.mTex_Btn.height)*.25,mItem[i].x,mItem[i].y,.1))
			{
				mSelect = i;
				console.log("innn Select");
			}
		}
	}

	TopItem()
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
	BottomItem()
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
	Handle_Gameplay(event,pointer)
	{
		mSel=0;
		if(CircRectsOverlap(-.85, -.85, floatWidth(this.mTex_Down.width)*.5,floatHeight(this.mTex_Down.height)*.45,screen2worldX(pointer.x),screen2worldY(pointer.y),.05)){
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
		if(CircRectsOverlap(.1, -.85, floatWidth(this.mTex_Down.width)*.5,floatHeight(this.mTex_Down.height)*.5,screen2worldX(pointer.x),screen2worldY(pointer.y),.05)){
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
		
		if(CircRectsOverlap(-.5, -.85, floatWidth(this.mTex_SldeIn.width)*.5,floatHeight(this.mTex_SldeIn.height)*.5,screen2worldX(pointer.x),screen2worldY(pointer.y),.05)){
			mSel = 3;//slidein
		}
		if(CircRectsOverlap(-.2, -.85, floatWidth(this.mTex_SldeIn.width)*.5,floatHeight(this.mTex_SldeIn.height)*.5,screen2worldX(pointer.x),screen2worldY(pointer.y),.05)){
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
	Move()
	{
		if(GameScreen === GAMEPLAY && _MoveType>-1)
		{
		
			if(mCircle.x<1.5)
			{
				if(Item.SPEED_FAC>Item.ANG_DIFF)
					Item.SPEED_FAC = Item.ANG_DIFF;
				if(mCirMove ===0)
					mSpdval  = _MoveType===0?Item.SPEED_FAC:-Item.SPEED_FAC;

				mCirMove += mSpdval;
				if(Math.abs(mCirMove)>=(Item.ANG_DIFF))
				{
					
					this.CheckCollide();
					mCircle.spd=0;
					if(isTouch && mSel!==0)
					{
						mCirMove=0;
					}
					else if(isKeyPress || mSel===0 || mISScroll)
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
				mCircle.spd = mSpdval;
				// console.log("!!!SPD!! "+mCircle.spd);
				for(let i=0;i<mItem.length;i++)
					mItem[i].Update(mCircle.x,mCircle.y,mCircle.spd,mCircle.radius);
				
				}
			}
	}
	

	DegreeToRadian(d)	 {
		var r = d * (Math.PI / 180);
		return r;
	}
	RadianToDegree(r) {
		var d = r * (180 / Math.PI);
		return d;
	}
	 GetAngle(d, e) {
	
		if (d == 0)
			return e >= 0 ? Math.PI / 2 : -Math.PI / 2;
		else if (d > 0)
			return Math.atan(e / d);
		else
			return Math.atan(e / d) + Math.PI;
	}
	
}
// end of class

document.addEventListener("visibilitychange", function(e) {
	// console.log('VISIBILITY CHANGE', document.visibilityState);
	// if(document.visibilityState === 'hidden')
	// {

	// }
	// else
	// {
	// 	GameScreen = GAMEPLAY;
	// 	isKeyPress = false;
	// }

});

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
						mItem[i].Set2(mCircle.x,mCircle.radius);
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
							mItem[i].Set2(mCircle.x,mCircle.radius);
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
document.addEventListener('keydown',function(event) {
	const key = event.code;
	// console.log(key);
	
	if(!isKeyPress)
	{
		switch(key)
		{
			case 'ArrowRight':
				break;
			case 'ArrowLeft':
				break;
			case 'ArrowUp':
				if(GameScreen === GAMEPLAY)
				{
				 	_MoveType=0;
				 	mCirMove=0;
				 	isKeyPress = true;
				}
				break;
			case 'ArrowDown':
				if(GameScreen === GAMEPLAY)
				{
					mCirMove=0;
					_MoveType=1;
					isKeyPress = true;
				}
				break;
			case 'Space':
				SlideIn();
				break;
			case 'Enter':
				SlideOut();
				break;
		}
	}	
	
});
document.addEventListener('keyup',function(event) {
	const key = event.code;
	// console.log("innnnnnnnnnnnn keyyy"+"   "+key);
	   switch(key)
		{
			case 'ArrowRight':
				break;
			case 'ArrowLeft':
				break;
			case 'ArrowUp':
				break;
			case 'ArrowDown':
				break;
		}
		// mCircle.spd=0;
		// if(GameScreen === GAMEPLAY && mCircle !== undefined)
		// {
		
		// }
	
});
	
function XPos(x){
	return (((1 + x) * maxX) / 2);
	}
function YPos(y) {
	return (((1 - (y)) *maxY) / 2);
}

function rgbToHex(r, g, b){
	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
 }
function DrawNumber(no,x, y) {
	// let dx = floatWidth(mTex_Font[0].width*.5);
	// let strs = "" + no;
	// for (let i = 0; i < strs.length; i++) {
	// 	let k = (strs.charAt(i));
	// 	if (k >= 0 && k < mTex_Font.length)
	// 		DrawTexture(mTex_Font[k],x + i * dx, y);
	// 		// mTex_Font[k].drawPos( x + i * dx, y);
	// }
}

function DrawText(Font,strs, x, y) {
	Font.setText(strs);
	var color = rgbToHex(255, 255, 255);
	Font.setColor(color);
	Font.alpha = 1;
	Font.angle = 0;
	Font.setScale(1);
	mRenderTex.draw(Font, XPos(x),YPos(y));
}
function DrawTextR(Font,strs, x, y,ang) {
	Font.setText(strs);
	var color = rgbToHex(255, 255, 255);
	Font.setColor(color);
	Font.alpha = 1;
	Font.angle = ang;
	Font.setScale(1);
	mRenderTex.draw(Font, XPos(x),YPos(y));
}
function DrawTextScalAlpha(Font, strs, x, y, s,a) {
	Font.setText(strs);
	var color = rgbToHex(255, 255, 255);
	Font.setColor(color);
	Font.alpha = a;
	Font.setScale(s);
	mRenderTex.draw(Font,XPos(x),YPos(y));
}

function DrawTextColor(Font, strs, x, y, r, g, b, a) {
	var color = rgbToHex(r, g, b);
	Font.setColor(color);
	Font.setText(strs);
	Font.alpha = a;
	Font.setScale(1);
	mRenderTex.draw(Font,XPos(x),YPos(y));
}
function DrawTextColorScal(Font, strs, x, y,s,r,g,b) {
	Font.setText(strs);
	var clr = rgbToHex(r, g, b);
	Font.setColor(clr);
	Font.alpha = 1;
	Font.setScale(s);
	mRenderTex.draw(Font, XPos(x),YPos(y));
}
function DrawTexture(img, x, y) {
	var hex = (255 * 0x010000) + (255 * 0x000100) + (255 * 0x000001);
	img.tint = hex;
	img.alpha = 1;
	img.angle = 0;
	img.setScale(1,1);
	mRenderTex.draw(img,XPos(x),YPos(y));

}
function DrawTextureSS(img, x, y, sx, sy) {
	var hex = (255 * 0x010000) + (255 * 0x000100) + (255 * 0x000001);
	img.tint = hex;
	img.alpha = 1;
	img.angle = 0;
	img.flipX = false;
	img.scaleX = sx;
	img.scaleY = sy;
	mRenderTex.draw(img,XPos(x),YPos(y));
}
function DrawTransScal(img, x, y, s, t) {
	var hex = (255 * 0x010000) + (255 * 0x000100) + (255 * 0x000001);
	img.tint = hex;
	img.alpha = t;
	img.angle = 0;
	img.setScale(s,s);
	mRenderTex.draw(img,XPos(x),YPos(y));
}
function DrawTextureFlip(img, x, y,isflipX, isflipY) {
	var hex = (255 * 0x010000) + (255 * 0x000100) + (255 * 0x000001);
	img.tint = hex;
	img.alpha = 1;
	img.setScale(1,1);
	img.flipX = isflipX;
	img.flipY = isflipY;
	img.angle = 0;
	mRenderTex.draw(img,XPos(x),YPos(y));

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
	mRenderTex.draw(img,XPos(x),YPos(y));

}
function DrawTextureRS(img, x, y, s, r) {
	var hex = (255 * 0x010000) + (255 * 0x000100) + (255 * 0x000001);
	img.tint = hex;
	img.alpha = 1;
	img.angle = r;
	img.setScale(s,.5);
	mRenderTex.draw(img,XPos(x),YPos(y));
}
function DrawTextureRTS(img, x, y, s, ang, r, g, b, alpha) {
	var hex = ((r * 255) * 0x010000) + ((g * 255) * 0x000100) + ((b * 255) * 0x000001);
	img.tint = hex;
	img.alpha = alpha;
	img.angle = ang;
	img.setScale(s,s);
	mRenderTex.draw(img,XPos(x),YPos(y));
}

function LoadImage(load, path) {
	path = 'assets/images/' + path;
	// console.log("!!! Path!!! "+path);
	var f_index = path.indexOf("/");
	var l_index = path.indexOf(".");
	var name = path.substring(f_index + 1, l_index);
	//  console.log("Index========= "+f_index+"     "+l_index+"     "+name+"     "+"      "+load);
	load.image(name, path);
}
function LoadImage2(load, path) {
	// path = 'assets/images/' + path;
	var f_index = path.indexOf("/");
	var l_index = path.indexOf(".");
	var name = path.substring(f_index + 1, l_index);
	//  console.log("Index========= "+f_index+"     "+l_index+"     "+name+"     "+"      "+load);
	load.image(name, path);
}
function LoadSVGImage(load, path) {
	path = 'assets/' + path;
	var f_index = path.indexOf("/");
	var l_index = path.indexOf(".");
	var name = path.substring(f_index + 1, l_index);
	load.svg(name, path);
	//  load.svg(name,path, { width: w, height: h });
}
function LoadSVGImageWH(load, path, w, h) {
	path = 'assets/' + path;
	var f_index = path.indexOf("/");
	var l_index = path.indexOf(".");
	var name = path.substring(f_index + 1, l_index);
	load.svg(name, path, { width: w, height: h });
}
function LoadSVGImageScal(load, path, scal) {
	path = 'assets/' + path;
	var f_index = path.indexOf("/");
	var l_index = path.indexOf(".");
	var name = path.substring(f_index + 1, l_index);
	load.svg(name, path, {scale:scal});
	//  load.svg(name,path, { width: w, height: h });
}
function GetImage(add, path) {
	path = 'assets/images/' + path;
	let f_index = path.indexOf("/");
	let l_index = path.indexOf(".");
	
	let name = path.substring(f_index + 1, l_index);
	// console.log("Get Image ===== "+name)
	// let img = add.image(XPos(0), YPos(0), name);
	let img = add.image(0,0,name);
	img.setOrigin(.5,.5);
	img.setVisible(false);
	return img;
	// console.log("Index========= "+f_index+"     "+l_index+"     "+name+"     "+path);
}
function GetImage2(add, path) {
	// path = 'assets/images/' + path;
	let f_index = path.indexOf("/");
	let l_index = path.indexOf(".");
	
	let name = path.substring(f_index + 1, l_index);
	// console.log("Get Image ===== "+name)
	// let img = add.image(XPos(0), YPos(0), name);
	let img = add.image(0,0,name);
	img.setOrigin(.5,.5);
	img.setVisible(false);
	return img;
	// console.log("Index========= "+f_index+"     "+l_index+"     "+name+"     "+path);
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
	if (left || right || top || bottom) {
	  return true;
	}
	return false;
}
function lineLine(x1, y1, x2, y2, x3, y3,  x4, y4) {
	var uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
	var uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
	if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
	  return true;
	}
	return false;
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
	
	let c = ((a / maxX) - 0.5) * 2;
	return c;
}
function screen2worldY(a) {
	let c = ((a / maxY) - 0.5) * (-2);
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

export default GameScene;