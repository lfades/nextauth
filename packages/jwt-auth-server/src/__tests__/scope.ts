import { Scope } from '../';

describe('Auth Scope', () => {
  const scope = new Scope({
    read: 'r',
    write: 'w',
    admin: 'a',
    posts: 'p',
    web: 'we'
  });

  const scopeStr = 'a:r:w|p:r:w|we:w:r:edit:something';

  const scopeArr = [
    'admin:read',
    'admin:write',
    'posts:read',
    'posts:write',
    'web:write',
    'web:read',
    'web:edit',
    'web:something'
  ];

  it('Creates a valid scope', () => {
    expect(scope.create([])).toBe('');
    expect(scope.create(scopeArr)).toBe(scopeStr);
    // This is a scope with some permissions mixed, but it should work too
    expect(
      scope.create([
        'admin:read',
        'admin:write',
        'posts:read:write',
        'web:write',
        'web:read',
        'web:edit:something'
      ])
    ).toBe(scopeStr);
  });

  it('Parses a scope', () => {
    expect(scope.parse('')).toEqual([]);
    expect(scope.parse('invalidstring')).toEqual([]);
    expect(scope.parse('invalid|string')).toEqual([]);
    expect(scope.parse(scopeStr)).toEqual(scopeArr);
  });
});
