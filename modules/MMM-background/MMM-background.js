const style = document.createElement("style");
style.textContent = `
  #bg-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -999;
    width: 100vw;
    height: 100vh;
    transition: opacity 1s ease-in-out;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
`;
document.head.appendChild(style);

Module.register("MMM-background", {
  // Default config options
  defaults: {
  },

  start() {
    Log.info("Starting module: " + this.name);
    this.sendSocketNotification('newbg')



  },

  setBackground(image) {
    let bg = document.getElementById('bg-wrapper')
    if (!bg) return;

    bg.style.opacity = 0
    setTimeout(()=>{
        bg.style.backgroundImage = `url("${image}")`;
        bg.style.backgroundSize = "cover";
        bg.style.backgroundRepeat = "no-repeat";
        bg.style.backgroundPosition = "center";
        bg.style.backgroundAttachment = "fixed";
        bg.style.transition = 'opacity 1s ease-in-out';
        bg.style.opacity = 1
    },300)
    
    },

  socketNotificationReceived(notification, payload) {
    if (notification === "bg") {
      this.setBackground(payload);
      setTimeout(()=>{
        console.log("newbg")
        this.sendSocketNotification('newbg')
      },500000)
    }
  },

  getDom(){
    const wrapper = document.createElement('div');
    wrapper.id = "bg-wrapper";
    return wrapper
  }
});