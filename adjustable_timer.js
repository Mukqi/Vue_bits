/* Adjustable Timer
This timer counts down a number of seconds then emits a "done" signal then restarts
It allows for adjustments to the length of the countdown and uses Bootstrap's progress
bar to display how far the countdown has to go.

 Example:
 HTML:
 <div id="app">
    <adjustable-timer :active="timerActive" v-on:ring="handleTimerRing" v-on:changeactive="handleTimerActiveChange"></adjustable-timer>
</div>

 JS:
 var app = new Vue({
    el: '#app',
    data: {
    },
    handleTimerExpire: function() {
        //Do stuff here
    },
    handleTimerActiveChange: function() {
        this.timerActive = !this.timerActive
        // Do stuff on change here
    }
 })
*/
Vue.component('adjustable-timer', {
    delimiters: ['[[', ']]'],
    props: {
        active: Boolean, // Whether or not the timer is actively counting down.
        progBarGranularity: { // how often per second progress bar updates
            type: Number,
            default: 1
        }
    },
    data: function () {
        return {
            interval: 5, //Seconds between refreshes
            timer: null,
            progBarValue: 0,
            progBarTimer: null,
        }
    },watch: {
        // Disable timers when not active to save some resources
        active: function(val) {
            if (val) {
                this.resetProgBar();
                this.timer = setInterval(() => {
                    this.emitRing();
                    this.resetProgBar();
                }, this.interval * 1000)
            } else {
                clearInterval(this.timer);
                clearInterval(this.progBarTimer);
                this.progBarValue = 0;
            }
        }
    },
    mounted: function() {
        this.resetProgBar();
        this.timer = setInterval(() => {
            this.emitRing();
            this.resetProgBar();
        }, this.interval * 1000)
    },
    beforeDestroy: function () {
        clearInterval(this.timer)
        clearInterval(this.progBarTimer);
    },
    computed: {
        calcProgBarVal: function() {
            return this.active ? this.progBarValue : 0;
        }
    },
    methods: {
        changeInterval: function() {
            clearInterval(this.timer);
            this.resetProgBar();
            this.timer = setInterval(() => {
                this.emitRing();
                this.resetProgBar();
            }, this.interval * 1000)
        },
        emitRing: function() {
            this.$emit('ring','')
        },
        resetProgBar: function() {
            // Count every second.
            clearInterval(this.progBarTimer);
            this.progBarValue = 0;
            this.progBarTimer = setInterval(() => {
                this.progBarValue += 1
                if (this.progBarValue >= this.interval * this.progBarGranularity) {
                    this.progBarValue = 0
                }
            }, 1000 / this.progBarGranularity)
        },

    },
    template: `
    <div>
        <b-input-group>
            <b-form-input style="width: 5rem;" type="number" v-model="interval" @change="changeInterval"></b-form-input>
            <b-input-group-append>
                <b-button :variant="active ? 'outline-success' : 'outline-danger'"
                    :title="active ? 'Syncing Data' : 'Syncing Paused'"
                    @click="$emit('changeactive')">
                    <span v-if="active">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                            fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                            <path
                                d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                            <path fill-rule="evenodd"
                                d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" />
                        </svg>
                    </span>
                    <span v-else>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                            fill="currentColor" class="bi bi-pause-circle" viewBox="0 0 16 16">
                            <path
                                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path
                                d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5z" />
                        </svg>
                    </span>
                </b-button>
            </b-input-group-append>
        </b-input-group>
        <b-progress :max="interval * progBarGranularity - progBarGranularity" height=".2rem" :striped="true" :animated="true">
            <b-progress-bar :value="calcProgBarVal" variant="warning" ref="progBar">
            </b-progress-bar>
        </b-progress>
    </div>
    `
})
