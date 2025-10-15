import type { AnimationControls } from 'framer-motion';

export default class ThemeSwitcherAnimator {
  private controls: AnimationControls;

  constructor(controls: AnimationControls) {
    this.controls = controls;
  }

  // ______________________________________________________________________ Over

  onRollOver = () => {
    console.log('ThemeSwitcherAnimator onRollOver');

    // Use the controls to start an animation
    this.controls.start({
      scale: 1.2,
      transition: { type: 'spring', stiffness: 400, damping: 15 },
    });
  };

  // _______________________________________________________________________ Out

  onRollOut = () => {
    console.log('ThemeSwitcherAnimator onRollOut');

    // Use the controls to reverse the animation
    this.controls.start({
      scale: 1,
      transition: { type: 'spring', stiffness: 400, damping: 10 },
    });
  };

  // ___________________________________________________________________ Destroy

  destroy = () => {
    // Stop any active animations on cleanup
    this.controls.stop();
    console.log('ThemeSwitcherAnimator destroy');
  };
}
