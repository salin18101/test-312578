//制作命令列表
Window_TitleCommand.prototype.makeCommandList = function() {
//添加一个选项 ,前面是显示内容,   后面是标志,用于方法调用时使用
    this.addCommand(TextManager.newGame,   'newGame');
    this.addCommand(TextManager.continue_, 'continue', this.isContinueEnabled());
    this.addCommand(TextManager.options,   'options');
    //如果要添添加一个项目可以直接添加文字
   // this.addCommand("鉴赏",   'gallery');
    this.addCommand("退出",   'exit');
};
 
 
 
 
(function() {
 
//制作命令列表
Window_TitleCommand.prototype.makeCommandList = function() {
    this.addCommand("新游戏",   'newGame');
    this.addCommand("继续", 'continue', this.isContinueEnabled());
    this.addCommand("设置",   'options');
    this.addCommand("退出",   'exit');
};
 
//创造选择窗口
Scene_Title.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_TitleCommand();
    //标志 绑定方法  也就是当点击相应选项时,会使用该选项标志 对应的方法
    this._commandWindow.setHandler('newGame',  this.commandNewGame.bind(this));
    this._commandWindow.setHandler('continue', this.commandContinue.bind(this));
    this._commandWindow.setHandler('options',  this.commandOptions.bind(this));
    //添加一个
    this._commandWindow.setHandler('exit', this.commandFour.bind(this));
 //   this._commandWindow.setHandler('gallery', this.commandRecollection.bind(this));
    this.addWindow(this._commandWindow);
};
 
 
Scene_Title.prototype.commandFour = function() {
    SceneManager.exit()
};
})();
