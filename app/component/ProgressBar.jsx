import React from 'react';

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.progress = 0;
    this.targetProgress = 0;
    this.animating = false;
  }

  go(progress) {
    console.log('progressing');
    this.targetProgress = progress;

    if (!this.animating) {
      const step = () => {
        if (this.progress < this.targetProgress) {
          this.progress = Math.min(this.progress + 3, this.targetProgress);
          this.progressBar.style.width = `${this.progress}%`;
          requestAnimationFrame(step);
        } else if (this.progress >= 100) {
          this.progress = 0;
          this.targetProgress = 0;
          this.progressBar.style.width = `${this.progress}%`;
          this.animating = false;
        } else {
          // progress hit target progress but less than 100, do nothing
          this.animating = false;
        }
      };
      requestAnimationFrame(step);
      this.animating = true;
    }
  }

  /**
   * return true if the progress bar is currently loading
   */
  isLoading() {
    return this.progress !== 0 && this.progress !== 100;
  }

  render() {
    return (
      <div
        className="shopee-progress-bar"
        ref={ref => {
          this.progressBar = ref;
        }}
      />
    );
  }
}

export default ProgressBar;
