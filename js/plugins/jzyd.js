Game_CharacterBase.prototype.updateMove = function() {
        //移动速度为0时不移动
        if (this._moveSpeed === 0) {
                this.setPosition(this._realX,this._realY);
                }
    if (this._x < this._realX) {
        this._realX = Math.max(this._realX - this.distancePerFrame(), this._x);
    }
    if (this._x > this._realX) {
        this._realX = Math.min(this._realX + this.distancePerFrame(), this._x);
    }
    if (this._y < this._realY) {
        this._realY = Math.max(this._realY - this.distancePerFrame(), this._y);
    }
    if (this._y > this._realY) {
        this._realY = Math.min(this._realY + this.distancePerFrame(), this._y);
    }
    if (!this.isMoving()) {
        this.refreshBushDepth();
    }
};

Game_CharacterBase.prototype.setDirection = function(d) {
    if (!this.isDirectionFixed() && d) {
         if (this._moveSpeed === 0) {return}
        this._direction = d;
    }
    this.resetStopCount();
};
