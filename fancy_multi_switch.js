// The multi-fancy switch
// Uses the index of the "values" array to determine which switch it is on
// The "values" prop is an array of strings, each is a switch label
/* 
    Requires Vue and Bootstrap.  Should work without bootstrap, just won't look nice
    usage: 
        HTML:
        ...
        <fancy-tri-switch :value="switchValue" :values="switchValues" @change="handleToggleMultiSwitch"></fancy-tri-switch>
        ...


        VUEJS:
        ...
        data: {
            switchValues: ['hello','something','whatever']
            switchValue: 0
        },
        methods: {
            handleToggleMultiSwitch(item) {
                // Outputs the index of the button pressed
                this.switchValue = item
            }
        }
        ...

    styling:
        classes:
            .fancy-switch-button-group
            .fancy-switch-button
            .fancy-switch-lock-button
*/
Vue.component('fancy-tri-switch', {
    delimiters: ['[[', ']]'],
    props: ['value', 'values'],
    data: function () {
        return {
            locked: true,
            currentValue: 0
        }
    },
    mounted() {
        this.currentValue = this.value
    },
    computed: {
        valueComputed: function() {
            return Boolean(this.value)
        }
    },
    methods: {
        
    },
    template: `
    <div>
        <div class="btn-group fancy-switch-button-group" role="group" aria-label="Fancy Multi-Switch Group">
            <button v-for="(item, index) in values" class="btn fancy-switch-button" :class="value==index ? 'btn-primary' : 'btn-secondary'" :disabled="locked"  @click="$emit('change', index)"> [[ item ]] </button>
        </div>
        <button :class="locked ? 'btn-primary' : 'btn-outline-secondary'" @click="locked=!locked" class="btn fancy-switch-lock-button">
            <svg v-if="locked" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-unlock" viewBox="0 0 16 16">
                <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z"/>
            </svg>
        </button>
    </div>
    `
})
// END FANCY MULTI-SWITCH
