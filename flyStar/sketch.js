/*
 * @Description: 
 * @Author: zhh_e
 * @Date: 2023-02-25 14:28:31
 * @LastEditors: zhh_e
 * @LastEditTime: 2023-02-25 17:05:23
 */
let speed 
class Star {
    constructor(s){
        this.s = s
       this.x = s.random(0, s.width)
       this.y = s.random(0, s.height)
       this.z = s.random(s.width)
       this.pz = this.z
    }
    update(){
        this.z = this.z - speed
        if(this.z < 1){
            this.z = this.s.width
            this.x = this.s.random(-this.s.width,this.s.width)
            this.y = this.s.random(-this.s.height, this.s.height)
            this.pz = this.s.width
        }
    }
    show(){
        this.s.fill(255)
        this.s.noStroke()

        let sx = this.s.map(this.x / this.z, 0, 1, 0, this.s.width)
        let sy = this.s.map(this.y / this.z, 0, 1, 0, this.s.height)

        let r = this.s.map(this.z, 0, this.s.width, 16,0)
        this.s.ellipse(sx, sy, r)
        let px = this.s.map(this.x / this.pz, 0, 1, 0 ,this.s.width)
        let py = this.s.map(this.y / this.pz, 0, 1, 0 ,this.s.height)
        this.s.stroke(this.s.color(255,255,255,100))
        this.s.line(px,py, sx, sy)
    }
}

const s = sketch => {
    let starts = []
   
    sketch.setup = () => {
        sketch.createCanvas(600,600)
        sketch.background(0)
        starts = Array(600).fill(null).map(()=>{
            return new Star(sketch)
        })
    }
    sketch.draw = () =>{
        speed = sketch.map(sketch.mouseX,0, sketch.width, 0, 20)
        sketch.background(0) 
        sketch.translate(sketch.width / 2, sketch.height / 2)
        starts.forEach(item => {
            item.update()
            item.show()
        })
    }
}
let myp5 = new p5(s)

