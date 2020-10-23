new Vue({
   el: "#app",
   data: {
      playerLife: 100,
      monsterLife: 100,
      running: false,
      logs: [],
   },
   computed: {
      hasResult() {
         return this.playerLife == 0 || this.monsterLife == 0;
      }
   },
   watch: {
      hasResult(value) {
         if (value) this.running = false;
      }
   },
   methods: {
      startGame() {
         this.running = true;
         this.playerLife = 100;
         this.monsterLife = 100;
         this.logs = [];
      },
      attack(special) {
         this.hurt("monsterLife", 5, 10, special, 'Player', 'Monster', 'player');
         if (this.monsterLife) {
            this.hurt("playerLife", 7, 12, false, 'Monster', 'Player', 'monster');
         };
      },
      hurt(atr, min, max, special, source, target, cls) {
         const plus = special ? 5 : 0;
         const hurt = this.getRandom(min + plus, max + plus);
         this[atr] = Math.max(this[atr] - hurt, 0);
         this.registerLog(`${source} hit ${target} with ${hurt}.`, cls);
      },
      healAndHurt() {
         this.heal(10, 15);
         this.hurt('playerLife', 7, 12, false, 'Monster', 'Player', 'monster');
      },
      heal(min, max) {
         const heal = this.getRandom(min, max);
         this.playerLife = Math.min(this.playerLife + heal, 100);
         this.registerLog(`Player gained ${heal}% strength.`, 'heal');
      },
      getRandom(min, max) {
         const value = Math.random() * (max - min) + min;
         return Math.round(value);
      },
      registerLog(text, cls) {
         //cls = class
         this.logs.unshift({ text, cls });
      },
   }
});