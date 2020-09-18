export default problemText =
  "\\* Problem: candy *\\\n\n" +
  "Minimize\n" +
  "obj: + 101 xs + 801 s + 3001 m + 10001 l + 30001 xl\n\n" +
  "Subject To\n" +
  "con: + 100 xs + 800 s + 3000 m + 10000 l + 30000 xl >= {exp}\n\n" +
  "Bounds\n" +
  "xs <= {xs}\n" +
  "s <= {s}\n" +
  "m <= {m}\n" +
  "l <= {l}\n" +
  "xl <= {xl}\n\n" +
  "Generals\n" +
  "xs s m l xl\n\n" +
  "End";
