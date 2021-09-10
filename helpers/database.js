const JsonDB = require('node-json-db').JsonDB;
const Config = require('node-json-db/dist/lib/JsonDBConfig').Config;

class db{

    static getToken(){
        var db = new JsonDB(new Config("helpers/db", true, true, '/'));
        return db.getData('/TOKEN');
    };

    static getAdminKey(){
        var db = new JsonDB(new Config("helpers/db", true, true, '/'));
        return db.getData('/adminKey');
    }

    static setAdminKey(newKey){
        var db = new JsonDB(new Config("helpers/db", true, true, '/'));
        db.push('/adminKey', newKey, true);
        db.save();
    }

    static getLeader(departament){
        var db = new JsonDB(new Config("helpers/db", true, true, '/'));
        return db.getData('/leaders/'+departament);
    }

    static setLeader(departament, leaderName, leaderId, leaderPlace){
        var db = new JsonDB(new Config("helpers/db", true, true, '/'));
        db.push('/leaders/'+departament+'/id', leaderId, true);
        db.push('/leaders/'+departament+'/name', leaderName, true);
        db.push('/leaders/'+departament+'/place', leaderPlace, true);
        db.save();
    }

    static addActivity(name, description){
        var db = new JsonDB(new Config("helpers/db", true, true, '/'));
        let all = db.getData('/activitys/');
        all.push({
            "name": name,
            "desc": description
        });
        db.push('/activitys/', all, true);
        db.save()
        return "Добавлено"
    }

    static deleteActivity(name){
        var db = new JsonDB(new Config("helpers/db", true, true, '/'));
        let all = db.getData('/activitys/');
        let newArr = [];
        for (let i = 0; i < all.length; i++) {
            if(all[i].name != name){
                newArr.push(all[i])
            } 
        }
        db.push('/activitys/', newArr, true);
        db.save();
        return "Удалено"
    }

    static getAllActivitys(){
        var db = new JsonDB(new Config("helpers/db", true, true, '/'));
        return db.getData('/activitys/')
    }

    static getActivityByName(name){
        var db = new JsonDB(new Config("helpers/db", true, true, '/'));
        let all = db.getData('/activitys/');
        let activity = null;
        for (let i = 0; i < all.length; i++) {
            if(all[i].name == name){
                activity = all[i]
            } 
        }
        return activity
    }

    static setAction(id){
        var db = new JsonDB(new Config("helpers/db", true, true, '/'));
        let all = db.getData('/inAction/');
        all.push({
            "id": id
        });
        db.push('/inAction/', all, true);
        db.save()
    }
    
    static getAction(id){
        var db = new JsonDB(new Config("helpers/db", true, true, '/'));
        let all = db.getData('/inAction/');
        let actionId = null;
        for (let i = 0; i < all.length; i++) {
            if(all[i].id == id){
                actionId = all[i]
            } 
        }
        return actionId
    }

    static deleteAction(id){
        var db = new JsonDB(new Config("helpers/db", true, true, '/'));
        let all = db.getData('/inAction/');
        let newArr = [];
        for (let i = 0; i < all.length; i++) {
            if(all[i].id != id){
                newArr.push(all[i])
            } 
        }
        db.push('/inAction/', all, true);
        db.save();
        return "Удалено"
    }
}


module.exports = db;
