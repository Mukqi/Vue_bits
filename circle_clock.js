/* The Circle Fill
 Loads like a filling clock clockwise
 100% is full, 0% is empty.
 Anything above 100 is treated as x % 100.

 The background can be changed with the 'background' prop - Hex or css color name only
 The foreground can be changed with the 'foreground' prop - Hex or css color name only
 The actual value should be between 0-100 and supplied via the 'value' prop
 The size can be modified by changing the 'width' css value of the component.

 Example:
 HTML:
 <div id="app">
    <circle-fill :value="tmpVal" :background="tmpBack" :foreground="tmpFore" style="max-width: 20%;"></circle-fill>
 </div>

 JS:
 var app = new Vue({
    el: '#app',
    data: {
        tmpBack: "#e74c3c",
        tmpFore: "blue",
        tmpVal: 55
    }
 })
*/
Vue.component('circle-fill', {
    delimiters: ['[[', ']]'],
    props: {
        value: [String, Number],
        background: {
            type: String,
            default: "blue"
        },
        foreground: {
            type: String,
            default: "red"
        }
    },
    data: function () {
        return {
            circumference: 100 // Use 100 circ. for easy percentage
        }
    },
    computed: {
        calcValue() {
            // Prevents values from being greater than 100
            return Number(this.value) % 100
        },
        calcArray() {
            let remainder = 100 - this.calcValue;
            return "" + this.calcValue + " " + remainder;
        },
        calcCenterX() {
            // Stroke width must be included in here since 
            // half of the width of the stroke overflows outward
            return this.calcRadius + (this.calcStrokeWidth / 2)
        },
        calcCenterY() {
            return this.calcRadius + (this.calcStrokeWidth / 2)
        },
        calcViewBox() {
            // The size of the svg box.  Any smaller and the edges would be cut off
            return "0 0 " + this.calcCenterX*2 + " " + this.calcCenterY*2 + "";
        },
        calcRadius() {
            return this.circumference / (2 * Math.PI)
        },
        calcStrokeOffset() {
            // This 4 ensures the circle starts at the top instead of on the side of the circle
            return this.circumference / 4
        },
        calcStrokeWidth() {
            // This makes the foreground 'circle' fill the entire radius.
            // Reduce the 2 to make the foreground circle into a donut.
            return this.calcRadius * 2
        }
    },
    methods: {

    },
    template: `
    <div>
        <div id="countdown">
            <svg width="100%" height="100%" :viewBox="calcViewBox" class="donut">
                <circle class="donut-ring" :cx="calcCenterX" :cy="calcCenterY" :r="calcRadius" fill="transparent" :stroke="background" :stroke-width="calcStrokeWidth"></circle>
                <circle class="donut-segment" :cx="calcCenterX" :cy="calcCenterY" :r="calcRadius" fill="transparent" :stroke="foreground" :stroke-width="calcStrokeWidth" :stroke-dasharray="calcArray" :stroke-dashoffset="calcStrokeOffset"></circle>
              </svg>
        </div>
    </div>
    `
})
// END CIRCLE FILL
