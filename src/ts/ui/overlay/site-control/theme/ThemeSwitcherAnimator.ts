import { useAnimationControls } from 'framer-motion';

type AnimationControls = ReturnType<typeof useAnimationControls>;

export default class ThemeSwitcherAnimator {
  private controls: AnimationControls;

  constructor(controls: AnimationControls) {
    this.controls = controls;
  }

  // ______________________________________________________________________ Over

  onRollOver = () => {
    this.controls.start({
      scale: 2.0,
      transition: { type: 'spring', stiffness: 400, damping: 15 },
    });
  };

  // _______________________________________________________________________ Out

  onRollOut = () => {
    this.controls.start({
      scale: 1,
      transition: { type: 'spring', stiffness: 400, damping: 10 },
    });
  };

  // ___________________________________________________________________ Destroy

  destroy = () => {
    this.controls.stop();
  };
}
