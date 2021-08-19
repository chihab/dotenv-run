import { EnvPipe } from './env.pipe';

describe('EnvPipe', () => {
  it('create an instance', () => {
    const pipe = new EnvPipe();
    expect(pipe).toBeTruthy();
  });
});
