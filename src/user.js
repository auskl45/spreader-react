import

    class User {

        // level Number
        // xp Number
        // xpGoal Number
        // achivements Achivement[]
        // weeklyAchivements Achivement[]
        // badges Map<Badge, Boolean>
        constructor(achievements) {
            this.level = 1;
            this.xp = 0;
            this.xpGoal = 100;

            this.achievements = achievements;
            this.weeklyAchievements = [
                new Achievement("Spreads de la semaine", "Publier %d Spreads.", [10], [25], [null]),
                new Achievement("Likes de la semaine", "Liker %d Spreads.", [10], [25], [null]),
                new Achievement("Respread de la semaine", "Respreader %d fois.", [1], [10], [null])
            ]
            this.badges = new Map();
            this.badges.set(new Badge("badge1"), false); // � faire
            this.badges.set(new Badge("badge2"), false); // � faire
        }

        // Récupère l'achievement (dans un tableau) via le nom de l'achievement passé en paramètre
        // achievement_name String
        // return achievement []Achievement
        getAchievement(achievement_name) {
            let achievement = [];

            for (let i = 0; i < this.achievements.length; i++) {
                if (this.achievements[i].name == achievement_name
                    || this.achievements[i].realname == achievement_name) {
                    achievement.push(this.achievements[i]);
                }
            }

            for (let i = 0; i < this.weeklyAchievements.length; i++) {
                if (this.weeklyAchievements[i].name == achievement_name
                    || this.weeklyAchievements[i].realname == achievement_name) {
                    achievement.push(this.weeklyAchievements[i]);
                }
            }

            return achievement;
        }

        // Incrémentation de l'avancement d'un achievement via son nom et la valeur de l'incrémentation, tous deux passés en paramètres
        // achievement_name String
        // value Number
        // return [Number, Boolean] (correspondant à [valeur actuelle de l'avancement, booléen indiquant sa complétion ou non])
        majAchievement(achievement_name, value) {
            let achievement = this.getAchievement(achievement_name)[0];
            return achievement.majCurrent(value);
        }

        // Valide la complétion d'un achievement et le supprime si toutes ses étapes sont terminées ou passe à l'étape suivante sinon
        // achievement_name String
        // return [][Number, Badge] (tableau de tableaux correspondant à [valeur des points d'expériences gagnés, Badge gagné])
        clearAchievement(achievement_name) {
            let cleared = [];
            let reward;

            for (let i = 0; i < this.achievements.length; i++) {
                if (this.achievements[i].name == achievement_name
                    || this.achievements[i].realname == achievement_name) {
                    reward = this.achievements[i].getReward();
                    if (reward.length > 0) {
                        if (!reward[2]) {
                            this.achievements.splice(i, 1);
                        }
                        cleared.push(reward);
                    }
                }
            }

            for (let i = 0; i < this.weeklyAchievements.length; i++) {
                if (this.weeklyAchievements[i].name == achievement_name
                    || this.weeklyAchievements[i].realname == achievement_name) {
                    reward = this.weeklyAchievements[i].getReward();
                    if (reward.length > 0) {
                        if (!reward[2]) {
                            this.weeklyAchievements.splice(i, 1);
                        }
                        cleared.push(reward);
                    }
                }
            }

            return cleared;
        }

        // Valide la complétion de tous les achievements et les supprime si toutes leurs étapes sont terminées ou passe à leur étape suivante sinon
        // return [][Number, Badge] (tableau de tableaux pour chaque Achievement correspondant à [valeur des points d'expériences gagnés, Badge gagné])
        clearAllAchievements() {
            let cleared = [];
            let rewards;

            for (let i = 0; i < this.achievements.length; i++) {
                rewards = this.clearAchievement(this.achievements[i].name);
                for (let j = 0; j < rewards.length; j++) {
                    cleared.push(rewards[j]);
                }
            }

            for (let i = 0; i < this.weeklyAchievements.length; i++) {
                rewards = this.clearAchievement(this.weeklyAchievements[i].name);
                for (let j = 0; j < rewards.length; j++) {
                    cleared.push(rewards[j]);
                }
            }

            return cleared;
        }

        // Ajout de la possession du badge lors de son obtention
        // id_badge String
        // return Boolean (si ajouté, ou non si non trouvé)
        addBadge(id_badge) {
            let added = false;
            for (let i = 0; i < this.badges.length; i++) {
                if (Array.from(this.badges.keys())[i].id == id_badge) {
                    this.badges.set(Array.from(this.badges.keys())[i], true);
                    added = true;
                }
            }
            return added;
        }

        // Ajout d'un nouveau Badge obtenable
        // badge Badge
        // return Boolean (si ajouté, ou non si mauvais paramètre)
        addBadgeAdmin(badge) {
            let added = false;
            if (badge instanceof Badge) {
                this.badges.set(badge, false);
                added = true;
            }
            return added;
        }

        // Ajout de points d'expériences
        // value Number (points d'xp)
        // return void
        addXp(value) {
            this.xp += value;
            if (this.xp >= xpGoal) {
                this.levelUp()
            }
        }

        // Montée de niveau
        // return void
        levelUp() {
            this.level++;
            this.xp = - this.xpGoal;
        }
    }

class Badge {
    // id String
    // src String

    constructor(filename) {
        this.id = filename;
        this.src = "../src/assets/" + filename + ".png";
    }
}

class Achievement {
    // name String
    // description String
    // devdescription String
    // goals_xps Map<Number, [Number, Badge]>
    // step Number
    // current Number
    // stepClear Boolean
    // active Boolean

    constructor(name, description, goals, xps, badges) {
        if (goals.length == xps.length
            && goals.length == badges.length
            && badges.length == xps.length) {
            if (goals.length > 1) {
                this.name = name + " #1";
            } else {
                this.name = name;
            }
            this.realname = name;

            this.devdescription = description;
            this.description = description.replace("%d", goals[0]);

            this.step = 1;
            this.current = 0;
            this.stepClear = false;

            this.goals_xps = new Map();
            for (let i = 0; i < goals.length; i++) {
                this.goals_xps.set(goals[i], [xps[i], badges[i]]);
            }

            this.active = true;
        } else {
            console.error("AchievementError - Invalid parameter(s) in constructor !")
        }

    }

    majCurrent(value) {
        this.current += value;
        if (this.current >= Array.from(this.goals_xps.keys())[this.step - 1]) {
            this.stepClear = true;
        }
        return [this.current, this.stepClear]
    }

    getReward() {
        let currentGoal = Array.from(this.goals_xps.keys())[this.step - 1];
        let nextGoal = Array.from(this.goals_xps.keys())[this.step];
        if (this.current >= currentGoal) {
            let rewards = this.goals_xps.get(currentGoal);
            if (this.step < Array.from(this.goals_xps.keys()).length) {
                this.current -= currentGoal;
                this.step++;
                this.name = this.name.replace(
                    this.name.substring(this.name.length - 2, this.name.length),
                    "#" + this.step);
                this.description = this.devdescription.replace("%d", nextGoal);
                if (this.current >= nextGoal) {
                    this.stepClear = true;
                } else {
                    this.stepClear = false;
                }
                rewards.push(true);
            } else if (this.step == Array.from(this.goals_xps.keys()).length) {
                this.active = false;
                rewards.push(false);
            }
            return rewards;
        }
        return [];
    }
}