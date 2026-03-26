// min-to-duration.pipe.spec.ts
import { MinToDurationPipe } from './min-to-duration.pipe';

describe('MinToDurationPipe', () => {
  let pipe: MinToDurationPipe;

  beforeEach(() => {
    pipe = new MinToDurationPipe();
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });

  it('should convert minutes > 60 to hours and minutes', () => {
    const result = pipe.transform(90);
    expect(result).toBe('1h 30min');
  });

  it('should handle exactly 60 minutes', () => {
    const result = pipe.transform(60);
    expect(result).toBe('1h 0min');
  });

  it('should handle less than 60 minutes', () => {
    const result = pipe.transform(45);
    expect(result).toBe('0h 45min');
  });

  it('should handle larger values', () => {
    const result = pipe.transform(135);
    expect(result).toBe('2h 15min');
  });

  it('should return empty string for undefined', () => {
    const result = pipe.transform(undefined);
    expect(result).toBe('');
  });

  it('should return empty string for 0 minutes (current behavior)', () => {
    const result = pipe.transform(0);
    expect(result).toBe('');
  });
});
