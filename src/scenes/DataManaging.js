import Phaser from 'phaser'

class DataManaging extends Phaser.Data {
    create() {
        this.dataManage = new this.DataManager()
        this.dataManage.setFreeze(false)
        this.dataManage.set({name: 'Character', HP: '10', level: '1', STR: '1', INT: '1', CHA: '1'})
    }
}

export default DataManaging;
