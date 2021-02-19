


class LogoScene extends Phaser.Scene {

	
	constructor ()
    {
        super('LogoScene');
	
    }
	init(data)
    {
		console.log("init")
		// data = JSON.stringify(data);
        //  console.log(mGame.device);
    }
	preload ()
	{
		console.log("inLogo"+"       ");
		
		
		maxX = this.game.config.width;
		maxY = this.game.config.height;
		mCamera = this.cameras;
		mCamera.main.setBackgroundColor("#808080");
		LoadImage(this.load,'logo.png');
		LoadImage(this.load,'btn.png');
		LoadImage(this.load,'bg.png');
		LoadImage(this.load,'up.png');
		LoadImage(this.load,'down.png');
		LoadImage(this.load,'slidein.png');
		LoadImage(this.load,'slideout.png');
		LoadImage(this.load,'AcrobatMission.png');
		LoadImage(this.load,'3NinjasKickBack.png');
		LoadImage(this.load,'7thSagaThe.png');
		LoadImage(this.load,'90MinutesEuropeanPrimeGoal.png');
		LoadImage(this.load,'2020SuperBaseball.png');
		LoadImage(this.load,'AaahhRealMonsters.png');
		LoadImage(this.load,'ABCMondayNightFootball.png');
		LoadImage(this.load,'AcceleBrid.png');
		LoadImage(this.load,'AceoNerae.png');
		LoadImage(this.load,'ACMEAnimationFactory.png');
		LoadImage(this.load,'AcrobatMission.png');
		
		//this.load.audio('gameover' , './assets/sound/gameover.mp3');
		this.load.on('progress', function (value) {
			let val = value * 100;
			document.getElementById('load_txt').textContent = val.toFixed(2)+"%";
		});
		this.load.on('fileprogress', function (file) {

		});
		this.load.on('complete', function () {
			// console.log('!!Load complete!!!');
		});
	}
	create ()
	{
		
		checkOriention(this.game,this.scale.orientation);
		this.scale.on('orientationchange', checkOriention, this);
		mText = this.add.text(XPos(outPos), YPos(outPos), " ", { fontFamily: 'Carton_Six', align: 'center', fontSize: '96px', color: '#fff' });
		mText.setOrigin(.5, .5);
		mTex_Logo   = GetImage(this.add,'logo.png');
		mTex_Btn    = GetImage(this.add,'btn.png');
		mTex_Bg     = GetImage(this.add,'bg.png');
		mTex_Up     = GetImage(this.add,'up.png');
		mTex_Down   = GetImage(this.add,'down.png');
		mTex_SldeIn = GetImage(this.add,'slidein.png');
		mTex_SldeOut = GetImage(this.add,'slideout.png');

		mTex_Item.push(GetImage(this.add,'3NinjasKickBack.png'));
		mTex_Item.push(GetImage(this.add,'7thSagaThe.png'));
		mTex_Item.push(GetImage(this.add,'90MinutesEuropeanPrimeGoal.png'));
		mTex_Item.push(GetImage(this.add,'2020SuperBaseball.png'));
		mTex_Item.push(GetImage(this.add,'AaahhRealMonsters.png'));
		mTex_Item.push(GetImage(this.add,'ABCMondayNightFootball.png'));
		mTex_Item.push(GetImage(this.add,'AcceleBrid.png'));
		mTex_Item.push(GetImage(this.add,'AceoNerae.png'));
		mTex_Item.push(GetImage(this.add,'ACMEAnimationFactory.png'));
		mTex_Item.push(GetImage(this.add,'AcrobatMission.png'));

		// for(let i=0;i<mTex_Item.length;i++)
		// 	mTex_Item[i].setOrigin(.5,.5);
		// 	mTex_Btn.setOrigin(.5,.5);

		// Snd_Over 	=	 this.sound.add('gameover');
		Counter=0;
		console.log("maxX"+maxX+"      "+maxY)
		mRenderTex = this.add.renderTexture(0, 0, maxX,maxY);
		mRenderTex.setDepth(0);
		GameScreen = GAMELOGO;	
		this.scene.add('GameScene', GameScene, true);
		document.getElementById("loaderbg").style.display = "none";
	}
	

}
export default LogoScene;
document.addEventListener("visibilitychange", function(e) {
	// console.log('VISIBILITY CHANGE', document.visibilityState);
	if(document.visibilityState === 'hidden')
	{

	}
	else
	{
		GameScreen = GAMEPLAY;
		isKeyPress = false;
	}

});


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
		if(GameScreen === GAMEPLAY && mCircle !== undefined)
		{
		
		}
	
});


function LoadImage(load, path) {
	path = 'assets/images/' + path;
	// console.log("!!! Path!!! "+path);
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
	let img = add.image(XPos(0), YPos(0), name);
	img.setOrigin(.5,.5);
	img.setVisible(false);
	return img;

	// console.log("Index========= "+f_index+"     "+l_index+"     "+name+"     "+path);
}
var isMobile = {
    Android: function() { return navigator.userAgent.match(/Android/i); },
    BlackBerry: function() { return navigator.userAgent.match(/BlackBerry/i); },
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    Opera: function() { return navigator.userAgent.match(/Opera Mini/i); },
    Windows: function() { return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i); },
    any: function() { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};

// var GameConfig = {
// 	type: Phaser.CANVAS, //WEBGL CANVAS
// 	width: maxX,
// 	height: maxY,
// 	scene:[InitScene],
//     // scene: {
//     //     preload: preload,
//     //     create: create,
//     //     update: update
// 	// },
// 	audio: {
//         disableWebAudio: false
//     },
// 	scale: {
//         mode: Phaser.Scale.FIT,
// 		autoCenter: Phaser.Scale.CENTER_BOTH,
// 		orientation: Phaser.Scale.Orientation.LANDSCAPE, //PORTRAIT LANDSCAPE
// 	},
// 	fps: {
// 		target: 10,
// 		min: 10,
// 		forceSetTimeOut: false
// 	}
// };
