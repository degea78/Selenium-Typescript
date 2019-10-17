

export let finBeginDiscoveryArgument:string = '"bacnet", "ver:\"2.0\"\nbroadcastAddress,bindAddress,instanceLow,instanceHi,networkNo,discoveryTimeout\n\"255.255.255.255\",\"0.0.0.0\",0,4194303,65535,8\n"';
export let nHaystackConnIdGlobalVariable:string = "read(haystackConn)->id";
export let nHaystackFormExpressionArgument:string = '@1e38d9d1-f99897ff,[{navName: "AHU_1", dis: "Aquarium AHU_1", id: @S.Aquarium.AHU_1, navNameFormat: "%parent.displayName%", axType:"nhaystack:HEquip",' + 
                                                    'axSlotPath: "slot:/Aquarium/AHUs/AHU_1/equip", siteRef: @S.Aquarium, ahu, equip, learn: "sep:/Aquarium/AHU_1"}]';
export let nHaystackGetFirstWatchId:string = "finNHaystackShowWatches(read(haystackConn)->id)[0]->id";

export function randomAquariumEquipId():string {
    var min = 0;
    var max = 7;
    var getRandomNumber = Math.floor(Math.random() * (max - min) + min);
    var randomAquariumPointId = 'readAll(point and siteRef->dis == "Aquarium")['+ getRandomNumber +']->id';
    return randomAquariumPointId; 
};

export function randomAquariumPointId():string {
    var min = 0;
    var max = 15;
    var getRandomNumber = Math.floor(Math.random() * (max - min) + min);
    var randomAquariumPointId = 'readAll(point and haystackConnRef->dis == "Aquarium")['+ getRandomNumber +']->id';
    return randomAquariumPointId; 
};

export function randomBinFileRecId():string {
    var min = 0;
    var max = 15;
    var getRandomNumber = Math.floor(Math.random() * (max - min) + min);
    var randomAquariumPointId = 'readAll(file)['+ getRandomNumber +']->id';
    return randomAquariumPointId; 
};

export function randomDbEquipId():string {
    var min = 0;
    var max = 15;
    var getRandomNumber = Math.floor(Math.random() * (max - min) + min);
    var randomAquariumPointId = 'readAll(equip)['+ getRandomNumber +']->id';
    return randomAquariumPointId; 
};

export function randomDbPointId():string {
    var min = 0;
    var max = 15;
    var getRandomNumber = Math.floor(Math.random() * (max - min) + min);
    var randomAquariumPointId = 'readAll(point)['+ getRandomNumber +']->id';
    return randomAquariumPointId; 
};

export let snapshotTimestampForRestore:string = 'parseDateTime(folioSnapshots()[-1]->ts.toStr, "YYYY-MM-DD\'T\'hh:mm:ssz zzzz")';
export let trioFilePath:string = "io/backupCityCenter/BackupCityCenterTags.trio";

