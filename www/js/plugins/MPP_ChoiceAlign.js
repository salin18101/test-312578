//=============================================================================
// MPP_ChoiceAlign.js
//=============================================================================
// Copyright (c) 2020 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 【v1.0】 Possible to align the choice text.
 * @author Mokusei Penguin
 *
 * @help ※[] works even if it's not set.
 * Plugin command:
 *   ChoiceAlign n       # Specify the alignment for choices
 * 
 * ※ Variables can be used as values in the plugin command.
 *    v[n] to reference the value of the nth variable
 * 
 * ================================================================
 * ▼ Plugin command info
 * --------------------------------
 *  〇 ChoiceAlign n
 *      n : alignment (0:left, 1:center, 2:right)
 *   
 *   Specify the alignment for the next choice to be shown.
 *   
 *
 * ================================================================
 * ▼ Plugin parameters info
 * --------------------------------
 *  〇 Plugin Command
 *  
 *   Plugin command can be changed from the plugin parameters.
 *  
 *   You can shorten the command if you want.
 * 
 * ================================
 * Author : Mokusei Penguin
 * URL : http://woodpenguin.blog.fc2.com/
 *
 * @param === Command ===
 * @default [Command]
 * 
 * @param Plugin Commands
 * @type struct<Plugin>
 * @desc Plugin command name
 * @default {"SetChoiceAlign":"ChoiceAlign"}
 * @parent === Command ===
 * 
 */

/*~struct~Plugin:
 * @param SetChoiceAlign
 * @desc Set alignment for the choices (0:left, 1:center, 2:right)
 * @default SetChoiceAlign
 * 
 */


(function() {
    'use strict';
    
    const parameters = PluginManager.parameters('MPP_ChoiceAlign');
    const Params_PluginCommands = JSON.parse(parameters['Plugin Commands'] || "{}");

    //-----------------------------------------------------------------------------
    // Game_Message

    //15
    const _Game_Message_clear = Game_Message.prototype.clear;
    Game_Message.prototype.clear = function() {
        _Game_Message_clear.apply(this, arguments);
        this._choiceAlign = 0;
    };

    Game_Message.prototype.setChoiceAlign = function(align) {
        this._choiceAlign = align;
    };

    Game_Message.prototype.choiceAlign = function() {
        return this._choiceAlign;
    };

    //-----------------------------------------------------------------------------
    // Game_Interpreter


    //1739
    const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.apply(this, arguments);
        var args2 = this.mppPluginCommandArgs3(args);
        switch (command) {
            case Params_PluginCommands.SetChoiceAlign:
            case 'SetChoiceAlign':
                $gameMessage.setChoiceAlign(args2[0] || 0);
                break;
        }
        return true;
    };

    Game_Interpreter.prototype.mppPluginCommandArgs3 = function(args) {
        return args.map(arg => {
            if (/^\d+$/.test(arg)) {
                return Number(arg);
            } else if (/^v\[(\d+)\]$/.test(arg)) {
                return $gameVariables.value(Number(RegExp.$1));
            } else {
                return arg;
            }
        });
    };

    //-----------------------------------------------------------------------------
    // Window_ChoiceList

    //110
    Window_ChoiceList.prototype.drawItem = function(index) {
        var rect = this.itemRectForText(index);

        var text = this.commandName(index);
        switch ($gameMessage.choiceAlign()) {
            case 1:
                rect.x += (rect.width - this.textWidthEx(text)) / 2;
                break;
            case 2:
                rect.x += rect.width - this.textWidthEx(text);
                break;
        }

        this.drawTextEx(text, rect.x, rect.y);
    };



})();
