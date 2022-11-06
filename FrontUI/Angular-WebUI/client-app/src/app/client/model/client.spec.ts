import { Client } from './client';

describe('Client', () => {
  it('should create an instance', () => {
    expect(new Client("11","BRG",0,0)).toBeTruthy();
  });
});
