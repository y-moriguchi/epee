# Epee

Epee is a calculator which can treat exact pi and e.

## How to use

If you want use epee, call epee.piParser with output function (e.g. x => console.log(x) if you use with browser) and you get epee parser.  
And call the parser with string to parse, you can get result through the output function.

```javascript
const parser = epee.piParser(x => outputFunction(x));
```

## Grammar

### Result specifier

Top level element of the parser is result specifier.  
Parser has two result specifiers, scale and expand specifier.

Scale specifier can get a decimal with specified digits.

```
scale(pi * pi * pi * pi, 500)
```

Expand specifier can expand continued fraction.

```
expand(pi * pi * pi * pi, 20)
```

### Expression

Expression of the parser has usual infix notation.  
Unary minus, additon, multiplication, subtraction and division are supported.

```
scale(-2*pi + 1/3/e - 1, 20)
```

