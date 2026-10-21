# Bottle Review: categories and styles

Added for the dashboard's swap logic. Every spirit, liqueur, fortified wine and bitters note now has `category`, `style` and `character` in its frontmatter. A drink can swap one bottle for another **only within the same category**. Same style = *close swap*; different or blank style = *stretch swap*.

Values come from your notes (which came from the book) and from names printed on the bottle (e.g. "reposado", "VSOP"). Where the book doesn't say, `style` is blank (counts as stretch) and `character` is blank. Categories where the bottles aren't meaningfully split into styles use `standard`.

To change a bottle, edit its note's `category` / `style` / `character`. To merge two categories, give them the same `category` text.

**293 bottles, 71 categories. 36 blank styles, 124 blank characters.**

## Probable duplicate notes
Two notes for what looks like the same bottle. The dashboard treats these pairs as one bottle (list lives in the dashboard preview's config). Merging them would be cleaner; I haven't touched them.

- [[Appleton Estate Reserve Blend rum]] and [[Appleton Estate Reserve Blend]]
- [[Flor de Cana 4-Year White]] and [[Flor de Cana 4-year white rum]]
- [[Gosling's Black Seal rum]] and [[Gosling's Black Seal]]
- [[Zacapa 23 rum]] and [[Zacapa 23]]
- [[Blume Marillen Apricot Eau-de-Vie]] and [[Blume Marillen apricot eau-de-vie]]
- [[Russell's Reserve 6-Year Rye]] and [[Russell's Reserve rye]]
- [[H by Hine VSOP]] and [[Hine H Cognac]]
- [[Paul Beau VS Cognac]] and [[Paul Beau VS]]
- [[Chareau California Aloe Liqueur]] and [[Chareau aloe liqueur]]
- [[Cocchi Americano Bianco]] and [[Cocchi Americano]]
- [[Maraska Maraschino]] and [[Maraska maraschino liqueur]]
- [[Dolin Rouge]] and [[Dolin Sweet Vermouth]]

## Blank style (always a stretch swap until filled in)

- [[Amaro Nardini]] (Amaro)
- [[Amaro di Angostura]] (Amaro)
- [[Bitter Truth Jerry Thomas Bitters]] (Aromatic bitters)
- [[Peychaud's bitters]] (Aromatic bitters)
- [[Cachaca]] (Cachaca)
- [[Bordelet Calvados]] (Calvados)
- [[Caffe Lolita Licor de Cafe]] (Coffee liqueur)
- [[Coffee Liqueur]] (Coffee liqueur)
- [[Galliano Ristretto]] (Coffee liqueur)
- [[Kahlua coffee liqueur]] (Coffee liqueur)
- [[Beefeater 24 gin]] (Gin)
- [[Bombay gin]] (Gin)
- [[Dorothy Parker gin]] (Gin)
- [[Germain-Robin Craft-Method brandy]] (Grape brandy (other))
- [[Benedictine]] (Herbal liqueur)
- [[Chareau California Aloe Liqueur]] (Herbal liqueur)
- [[Chareau aloe liqueur]] (Herbal liqueur)
- [[Chartreuse]] (Herbal liqueur)
- [[Galliano l'Autentico]] (Herbal liqueur)
- [[Kummel liqueur]] (Herbal liqueur)
- [[St. Elizabeth allspice dram]] (Herbal liqueur)
- [[Strega]] (Herbal liqueur)
- [[Tailor Velvet Falernum]] (Herbal liqueur)
- [[Bushmills Original Irish whiskey]] (Irish whiskey)
- [[Jameson Irish Whiskey]] (Irish whiskey)
- [[Del Maguey Vida mezcal]] (Mezcal)
- [[Nuestra Soledad La Compania Ejutla mezcal]] (Mezcal)
- [[Royal Combier]] (Orange liqueur)
- [[Kappa pisco]] (Pisco)
- [[Balvenie Doublewood 12-year scotch]] (Scotch)
- [[Bank Note scotch]] (Scotch)
- [[Famous Grouse Scotch]] (Scotch)
- [[Williams & Humbert Dry Sack sherry]] (Sherry)
- [[Casa Mariol Vermut Negre]] (Sweet vermouth)
- [[Creme Yvette]] (Violet liqueur)
- [[Wyoming Whiskey]] (Whiskey (other))

## All bottles by category

### Absinthe (4)
| Bottle | Style | Character |
|---|---|---|
| [[Absinthe]] | standard |  |
| [[Pernod absinthe]] | standard | Absinthe is much like bitters: a highly concentrated flavoring used in small amounts for a bright herbal punch, or as a glass rinse that perfumes the drink (the defining Sazerac technique) |
| [[St. George absinthe]] | standard |  |
| [[Vieux Pontarlier absinthe]] | standard | Absinthe is much like bitters: a highly concentrated flavoring used in small amounts for a bright herbal punch, or as a glass rinse that perfumes the drink (the defining Sazerac technique) |

### Amaretto (1)
| Bottle | Style | Character |
|---|---|---|
| [[Lazzaroni amaretto]] | standard | Nutty, sweet |

### Amaro (15)
| Bottle | Style | Character |
|---|---|---|
| [[Aperol]] | aperitivo |  |
| [[Campari]] | aperitivo |  |
| [[Suze]] | aperitivo |  |
| [[Fernet-Branca]] | dense | Dense amaro: acquired taste; intense bitterness that reveals caramel, coffee, anise and burnt orange with a minty finish. Start with a small amount as seasoning. See _Notes - Amaro |
| [[Luxardo Amaro Abano]] | dense |  |
| [[Amaro Meletti]] | light |  |
| [[Amaro Montenegro]] | light |  |
| [[Amaro Nonino]] | light |  |
| [[Amaro Averna]] | medium | Medium amaro: much sweeter than most, which balances strong anise, lemon, juniper and sage flavors; pronounced sweetness tempers the bitterness, so a good first amaro. See _Notes - Amaro |
| [[Amaro CioCiaro]] | medium |  |
| [[Bigallet China-China Amer]] | medium | Bittersweet orange aperitif made with the classic Amer Picon recipe in mind; used in place of modern, less bitter Amer Picon |
| [[Cynar]] | medium | Medium amaro: reputation for bitterness, but between CioCiaro and the dense amari |
| [[Ramazzotti]] | medium | Orange-flavored amaro. Book: 30% ABV; woody birch, cooked citrus and herbs; highly bitter, sweet and earthy yet drying |
| [[Amaro Nardini]] | *blank* |  |
| [[Amaro di Angostura]] | *blank* | Used to season an amontillado core in Jump in the Line. See _Notes - Amaro |

### American apple brandy (7)
| Bottle | Style | Character |
|---|---|---|
| [[Black Dirt Apple Jack]] | aged | Made in New York State in limited quantities; inspired by Laird's but forges its own path |
| [[Clear Creek 2-year apple brandy]] | aged | A bit of an outlier: akin to a very young French-style apple brandy, with a lot of fire and personality because of its youth. The authors use it where they might otherwise go with an American whiskey |
| [[Clear Creek 8-year apple brandy]] | aged | Made from Golden Delicious apples, distilled in a copper pot still, aged at least eight years in used and new French oak |
| [[Copper & Kings Floodwall Apple Brandy]] | aged | Kentucky; distilled in copper pot stills and aged a minimum of four years in used bourbon and oloroso sherry casks: a unique blend of European and American aging styles |
| [[Laird's 100-proof straight apple brandy]] | aged | Produced from West Virginia apples and distilled in Virginia; the benchmark American apple brandy. Highly potent and spicy, it dominates a cocktail if not kept in check |
| [[Laird's 88-proof 12-Year Apple Brandy]] | aged | Refined, elegant pot still apple brandy. Deep amber, sweet chocolatey aroma and buttery flavor with vanilla and nutmeg notes |
| [[Copper & Kings unaged apple brandy]] | unaged |  |

### Aperitif wine (5)
| Bottle | Style | Character |
|---|---|---|
| [[Cocchi Americano]] | blanc |  |
| [[Cocchi Americano Bianco]] | blanc | Similar to Lillet blanc (slightly bitter, orangey) but with a good deal more cinchona bitterness, so used when more structure is needed to balance other big flavors (Little Victory, p77, uses a root beer infusion of it) |
| [[Lillet Blanc]] | blanc |  |
| [[Bonal Gentiane-Quina]] | gentian quina | Slightly bitter from cinchona bark and gentian root; tastes like a bitter amontillado sherry with raisin on the nose, though dry on the palate. Pairs well with aged rum (Manhattan-style or with citrus) |
| [[Lillet Rose]] | rose | Introduced in 2012: a mix of Lillet blanc, Lillet rouge and fruit liqueurs. Like Lillet blanc with a touch more sweet fruit, particularly strawberry. Works from Martini variations to spritzes |

### Apricot liqueur (2)
| Bottle | Style | Character |
|---|---|---|
| [[Giffard Abricot du Roussillon]] | standard | Made by macerating Roussillon apricots in alcohol: Technicolor apricot color and an aroma of dried apricot. Used in Normandie Club Martini No. 2 for a whisper of tart fruit |
| [[Rothman & Winter apricot liqueur]] | standard |  |

### Aquavit (2)
| Bottle | Style | Character |
|---|---|---|
| [[Krogstad aquavit]] | standard | Savory aquavit chosen to deepen the flavor of the Normandie Club Bloody Mary |
| [[Linie aquavit]] | standard |  |

### Armagnac (3)
| Bottle | Style | Character |
|---|---|---|
| [[Tariquet Classique VS Bas-Armagnac]] | VS | A great introduction to Armagnac at a fantastic price. Young but surprisingly full-bodied, with dried apricots and toasted spices, primarily clove and a touch of cinnamon |
| [[Tariquet VSOP Bas-Armagnac]] | VSOP | More structure and complexity with more time in oak |
| [[Domaine d'Esperance Blanche Armagnac]] | blanche | Blanche (unaged) Armagnac is a great substitute for other unaged grape brandies |

### Aromatic bitters (5)
| Bottle | Style | Character |
|---|---|---|
| [[Miracle Mile Castilian Bitters]] | sherry-based | Sherry wine-based bitters from Los Angeles. Warm, nutty, slightly oxidized character. A more interesting substitute anywhere Angostura Bitters is called for as a seasoning |
| [[Angostura Bitters]] | standard | The world's most widely available bitters and the most common aromatic type: a dense sweet base, a bitter backbone (gentian), and warming spice (clove, cinnamon) |
| [[Bitter Truth Aromatic Bitters]] | standard | A barely perceptible layer of cinnamon and clove; used as an amplifying dash alongside Angostura in the Ideal Old-Fashioned |
| [[Bitter Truth Jerry Thomas Bitters]] | *blank* |  |
| [[Peychaud's bitters]] | *blank* |  |

### Banana liqueur (1)
| Bottle | Style | Character |
|---|---|---|
| [[Giffard Banane du Bresil]] | standard |  |

### Biscotti liqueur (1)
| Bottle | Style | Character |
|---|---|---|
| [[Faretti Biscotti Famosi liqueur]] | standard | Biscotti-flavored liqueur used in Bean Me Up Biscotti |

### Blanc vermouth (3)
| Bottle | Style | Character |
|---|---|---|
| [[Dolin Blanc]] | standard | The bottle that made the book fall in love with the style |
| [[La Quintinye Vermouth Royal Blanc]] | standard |  |
| [[Martini & Rossi Bianco]] | standard | Favorite among the big-house biancos and easier to find than Dolin blanc or La Quintinye; exerts its personality a bit more than Dolin blanc, which makes it a good companion for blanco tequila, mezcal and gin |

### Bourbon (8)
| Bottle | Style | Character |
|---|---|---|
| [[Buffalo Trace bourbon]] | standard |  |
| [[Eagle Rare 10-Year Bourbon]] | standard | Made at the Buffalo Trace distillery, likely from the same mashbill as the eponymous (and also delicious) Buffalo Trace bourbon, Eagle Rare has a bit more age, along with a noticeable amount of rye, resulting in a whiskey with... |
| [[Elijah Craig Small Batch Bourbon]] | standard |  |
| [[Evan Williams Black Label bourbon]] | standard | Dave Fernie's pick: no top-shelf booze needed in an Old-Fashioned |
| [[Jack Daniel's]] | standard |  |
| [[Old Forester 86 bourbon]] | standard |  |
| [[Old Grand-Dad 114 Bourbon]] | standard | Our benchmark whiskey for Old-Fashioneds is this diplomat, which works equally well across the aisles of shaken and stirred cocktails |
| [[Old Weller Antique 107 Bourbon]] | wheated | Pappy Van Winkle gets all the attention these days, but we love its cousin Old Weller (bother are made from the same mashbill at the Buffalo Trace Distillery) |

### Cachaca (4)
| Bottle | Style | Character |
|---|---|---|
| [[Avua Amburana cachaca]] | aged | Adds chocolate and cinnamon notes. Aged two years in Latin American amburana wood |
| [[Avua Prata]] | unaged | Cachaca. Grassy aroma of rhum agricole plus cinnamon and violets and a touch of vanilla. Used as the base in many drinks, or 1/2 oz mingled with dry sherry or vermouth |
| [[Novo Fogo Silver]] | unaged | Cachaca. In the US, could be considered a benchmark cachaca: rich, bold, vegetal, with lots of character but not overly aggressive. Excellent for Caipirinhas |
| [[Cachaca]] | *blank* |  |

### Calvados (6)
| Bottle | Style | Character |
|---|---|---|
| [[Busnel Pays d'Auge VSOP Calvados]] | Pays d'Auge | For the authors the aroma and flavor of Busnel's VSOP have become inseparable from Calvados in general |
| [[Domaine de Montreuil Pays d'Auge Reserve Calvados]] | Pays d'Auge | Pays d'Auge Calvados (apple brandy from Normandy) used in Calvados and Tonic |
| [[Dupont Pays d'Auge Original Calvados]] | Pays d'Auge |  |
| [[Dupont Pays d'Auge Reserve]] | Pays d'Auge | Exceptionally elegant, blended from spirits aged in oak casks, 25 percent of which are new, giving a toastier flavor subtly seasoned with spice and a hint of vanilla |
| [[Drouin Blanche de Normandie apple brandy]] | unaged | Unaged French apple brandy used in Apple Pop |
| [[Bordelet Calvados]] | *blank* |  |

### Cardamom bitters (1)
| Bottle | Style | Character |
|---|---|---|
| [[Fee Brothers Cardamom bitters]] | standard |  |

### Cassis liqueur (2)
| Bottle | Style | Character |
|---|---|---|
| [[Gabriel Boudier Creme de Cassis de Dijon]] | standard | A classic addition to the Kir Royale; fruity, tannic and surprisingly dry, so as much as 1/4 oz can be added without making a cocktail cloying |
| [[Giffard Cassis Noir de Bourgogne]] | standard |  |

### Celery bitters (1)
| Bottle | Style | Character |
|---|---|---|
| [[Miracle Mile Celery Bitters]] | standard | Savory; the book notes celery bitters are surprisingly great with bourbon |

### Cherry liqueur (1)
| Bottle | Style | Character |
|---|---|---|
| [[Cherry Heering]] | standard |  |

### Coconut liqueur (1)
| Bottle | Style | Character |
|---|---|---|
| [[Kalani coconut liqueur]] | standard |  |

### Coffee liqueur (4)
| Bottle | Style | Character |
|---|---|---|
| [[Caffe Lolita Licor de Cafe]] | *blank* | Produced in Mexico: strong coffee flavor without being cloyingly sweet, so more versatile |
| [[Coffee Liqueur]] | *blank* | Generic coffee liqueur called for in Bean Me Up Biscotti |
| [[Galliano Ristretto]] | *blank* | Inspired by strong espresso: intensely complex, with cinnamon and chocolate besides coffee. Best in tiny amounts to give the impression of coffee without overshadowing the core flavor, as in the Aces and Eights |
| [[Kahlua coffee liqueur]] | *blank* |  |

### Cognac (10)
| Bottle | Style | Character |
|---|---|---|
| [[Paul Beau Hors d'Age Cognac]] | Hors d'Age | Expensive but perfect: used in A Ridiculously Good and Unnecessary Sidecar |
| [[Hennessy VS]] | VS | Hennessy makes as much as 40 percent of the world's Cognac supply. Authors admire its consistency and find it characteristic of Cognac: woody and sweet with a mild clove flavor, and almost always available |
| [[Paul Beau VS]] | VS | Unlike most VS Cognacs (fine to sip but not complex enough for cocktails), Paul Beau balances the strength of a young spirit with vanilla and toasty oak. Attractive price, typically $30-$40 |
| [[Paul Beau VS Cognac]] | VS |  |
| [[H by Hine VSOP]] | VSOP | Hine created the "H" bottling for demand for cocktail-friendly Cognacs: affordable and with a strong personality. Strong floral aroma, fresh stone fruit flavors, a little spice |
| [[Hine H Cognac]] | VSOP |  |
| [[Park VSOP]] | VSOP | Many Cognacs of this age are deep and juicy; Park VSOP has a noticeably bright aroma and flavor |
| [[Paul Beau VSOP Cognac]] | VSOP | Chosen for its textural earthiness, reminiscent of pear skin. Used in Rational Thought |
| [[Pierre Ferrand 1840 Cognac]] | VSOP | Relatively new, created specifically for mixing |
| [[Pierre Ferrand Ambre Cognac]] | VSOP | The authors' go-to Cognac for cocktails. Sweet vanilla and apricot nose, deep and complex flavor with clear oak influence and a fresh-fruit quality like biting into a sweet apple |

### Creme de cacao (2)
| Bottle | Style | Character |
|---|---|---|
| [[Giffard white creme de cacao]] | standard | Made from cacao beans and a small amount of vanilla: a high-quality, reliable option. The authors are very careful with it: more than 3/4 oz and a drink tastes like powdered chocolate milk |
| [[Marie Brizard white creme de cacao]] | standard |  |

### Dessert wine (1)
| Bottle | Style | Character |
|---|---|---|
| [[Sauternes Wine]] | standard |  |

### Dry vermouth (4)
| Bottle | Style | Character |
|---|---|---|
| [[Boissiere dry vermouth]] | standard |  |
| [[Dolin dry vermouth]] | standard |  |
| [[La Quintinye Vermouth Royal extra dry]] | standard |  |
| [[Noilly Prat Extra Dry]] | standard | From Marseille; one of the few dry vermouths available in the US before the modern spirits revival, and a staple ever since thanks to its flavor and availability |

### Eau-de-vie (10)
| Bottle | Style | Character |
|---|---|---|
| [[Clear Creek Douglas fir brandy]] | Douglas fir | Highly flavorful Douglas fir eau-de-vie (used in the Dean Martin) |
| [[Blume Marillen Apricot Eau-de-Vie]] | apricot | Made from Klosterneuburger apricots of the Danube Valley: floral and dry, and a little goes a long way. See Rendezvous in Chennai |
| [[Blume Marillen apricot eau-de-vie]] | apricot |  |
| [[Clear Creek Cherry Brandy]] | cherry | Made with Oregon and Washington cherries: sweet on the nose, fruity and strong. See _Notes - Brandy |
| [[Massenez Kirsch Vieux]] | cherry | Alsace; nutty, almond-like. See _Notes - Brandy |
| [[Clear Creek pear brandy]] | pear | Both a nod to traditional European eau-de-vie and a celebration of Oregon's agriculture. Made with pears from the slopes of Mt |
| [[Massenez Poire Williams]] | pear | Alsatian brandies have a clarity and sharpness like bone-dry Alsatian Rieslings; many connoisseurs regard Alsatian eaux-de-vie as the finest |
| [[Clear Creek blue plum brandy]] | plum |  |
| [[Clear Creek raspberry brandy]] | raspberry |  |
| [[St. George raspberry brandy]] | raspberry |  |

### Elderflower liqueur (1)
| Bottle | Style | Character |
|---|---|---|
| [[St-Germain]] | standard | The elderflower liqueur that launched in 2007 and started the trend; "bartender's ketchup". Sweet floral aroma, full-bodied like a dessert wine; extremely versatile |

### Gentian liqueur (1)
| Bottle | Style | Character |
|---|---|---|
| [[Salers Gentiane]] | standard |  |

### Gin (13)
| Bottle | Style | Character |
|---|---|---|
| [[Beefeater London Dry gin]] | London dry | The bottling exported to the US is 47% ABV: enough proof to cut through amari, citrus and fruit syrups, but delicate enough not to overpower the vermouth in a Martini |
| [[Fords gin]] | London dry | Named after Simon Ford (formerly of Plymouth and Beefeater). Falls between Plymouth and Beefeater in flavor and proof; created for use in all styles of cocktail: citrusy, boozy and bitter. Extremely versatile |
| [[Plymouth gin]] | London dry | 41.2% ABV, soft citrusy botanical blend with pronounced juniper undertones |
| [[Sipsmith gin]] | London dry | Developed to be the perfect Martini gin; best when put center stage in gin-core cocktails like the Martini (also makes a tasty gin and tonic) |
| [[Tanqueray gin]] | London dry | On the market since the 1830s, the first of what is now called London dry. US version is 47.3% ABV |
| [[Hayman's Old Tom gin]] | Old Tom | Slightly sweetened but heavy on botanicals; fresh citrus quality (vs. dried citrus in London dry) and pronounced licorice. The first Old Tom to reach the US, a standard of the style |
| [[Aviation gin]] | contemporary | Made from a malty rye spirit; pulls back on juniper and features sarsaparilla (root beer impression) and lavender |
| [[St. George Botanivore gin]] | contemporary | The most traditional of the St. George trio: 19 botanicals including dill, hops and bergamot |
| [[St. George Dry Rye gin]] | contemporary | Made from a 100 percent rye base with only six botanicals; the spicy base reinforces juniper's peppery character |
| [[St. George Terroir gin]] | contemporary | A love letter to California: 12 botanicals from Douglas fir to sage; woodsy |
| [[Beefeater 24 gin]] | *blank* |  |
| [[Bombay gin]] | *blank* |  |
| [[Dorothy Parker gin]] | *blank* |  |

### Grape brandy (other) (1)
| Bottle | Style | Character |
|---|---|---|
| [[Germain-Robin Craft-Method brandy]] | *blank* |  |

### Grapefruit bitters (1)
| Bottle | Style | Character |
|---|---|---|
| [[Bittermens hopped grapefruit bitters]] | standard |  |

### Grapefruit liqueur (1)
| Bottle | Style | Character |
|---|---|---|
| [[Giffard Creme de Pamplemousse]] | standard | Intensely aromatic with a great balance between sweetness and bright acidity: "the new St-Germain", a liqueur that makes every drink it touches better |

### Grappa (1)
| Bottle | Style | Character |
|---|---|---|
| [[Clear Creek Pinot Noir grappa]] | standard |  |

### Herbal liqueur (10)
| Bottle | Style | Character |
|---|---|---|
| [[Green Chartreuse]] | green |  |
| [[Benedictine]] | *blank* | Sweet liqueur with herbal and honey flavors. One of the more approachable herbal liqueurs: broad flavor, honey-like sweetness laced through earthy spices. Pairs well with aged brown spirits and apple brandies |
| [[Chareau California Aloe Liqueur]] | *blank* | Introduced in 2014, on an unaged brandy backbone: layers of aloe, cucumber, lemon peel, muskmelon and spearmint. Aloe dominates at first but lingers into a refreshing herbal complexity; surprisingly dry |
| [[Chareau aloe liqueur]] | *blank* |  |
| [[Chartreuse]] | *blank* | Made by Carthusian monks at the base of the French Alps |
| [[Galliano l'Autentico]] | *blank* | Strong anise, juniper, cinnamon and especially vanilla; a clever way to add subtle vanilla. Typically under 1/2 oz as it overshadows (Aces and Eights, p278) |
| [[Kummel liqueur]] | *blank* |  |
| [[St. Elizabeth allspice dram]] | *blank* |  |
| [[Strega]] | *blank* | Yellow from saffron, one of over seventy flavorings: savory with light anise notes. Used like yellow Chartreuse but more challenging; typically 1 tsp in a stirred cocktail or alongside simple syrup in a sour |
| [[Tailor Velvet Falernum]] | *blank* |  |

### Irish cream (1)
| Bottle | Style | Character |
|---|---|---|
| [[Baileys Irish Cream]] | standard |  |

### Irish whiskey (3)
| Bottle | Style | Character |
|---|---|---|
| [[Redbreast 12-year Irish whiskey]] | pot still | Epitomizes traditional pot still Irish whiskey: rich and almost oily (unmalted and malted barley mash in copper pot stills), an almost coconut-like quality and slight anise |
| [[Bushmills Original Irish whiskey]] | *blank* | Aged five years in used American oak; a lighter style than other Bushmills, with clarity that suits citrusy cocktails |
| [[Jameson Irish Whiskey]] | *blank* |  |

### Japanese whisky (3)
| Bottle | Style | Character |
|---|---|---|
| [[Suntory Toki]] | blend | Blend of whiskies from Suntory's three distilleries (Yamazaki, Hakushu, Chita): smooth and light, usually around $45, an affordable gentle introduction to Japanese whisky |
| [[Nikka Coffey Grain Whisky]] | grain | Lies somewhere between Irish whiskey and bourbon: made mostly from corn, giving bourbon-like vanilla and spice, aged in various barrels and blended |
| [[Hakushu 12-year Japanese whisky]] | single malt | A 12-year Japanese whisky that's soft and elegant with only a whisper of smokiness; the base of the book's Ideal Whisky Highball because it doesn't overpower the light tingle of sparkling water |

### Lavender bitters (1)
| Bottle | Style | Character |
|---|---|---|
| [[Scrappy's lavender bitters]] | standard |  |

### Limoncello (1)
| Bottle | Style | Character |
|---|---|---|
| [[Meletti limoncello]] | standard |  |

### Madeira (3)
| Bottle | Style | Character |
|---|---|---|
| [[Barbeito 5-year rainwater madeira]] | rainwater |  |
| [[Broadbent Rainwater Medium-Dry Madeira]] | rainwater | More complex than the Sandeman: concentrated dried-fig and nutty aroma, dark copper color, slight sweetness with bright citrusy acidity; reminiscent of a tawny port. See _Notes - Madeira |
| [[Sandeman Rainwater Madeira]] | rainwater | Light-bodied, clean nutty aroma, crisp and complex; a great intro to rainwater madeira and good for stretching dense flavors, as in the Golden Boy. See _Notes - Madeira |

### Maraschino liqueur (2)
| Bottle | Style | Character |
|---|---|---|
| [[Maraska Maraschino]] | standard | Same base material and process as Luxardo but sweeter, with a more pronounced cherry flavor. Used in tiny amounts (1 tsp to 1/4 oz) as seasoning in stirred cocktails like the Brooklyn |
| [[Maraska maraschino liqueur]] | standard |  |

### Mezcal (3)
| Bottle | Style | Character |
|---|---|---|
| [[Los Amantes Reposado mezcal]] | reposado | Aged up to 8 months in French oak with only a modest oak influence; the authors' favorite aged mezcal |
| [[Del Maguey Vida mezcal]] | *blank* | Entry-level: smoky with smooth vegetal undertones. Works as the primary or supporting spirit |
| [[Nuestra Soledad La Compania Ejutla mezcal]] | *blank* | Less smoky; mint, cilantro, mango and green bell pepper finish. Plays well with blanco tequila and gin |

### Mint liqueur (3)
| Bottle | Style | Character |
|---|---|---|
| [[Giffard Menthe-Pastille]] | standard | Try it the French way, over crushed ice, or in classic creme de menthe cocktails; add a bit to drinks with fresh mint (Salvation Julep, p283) or a tiny bit to herbal-liqueur drinks to amplify them (Greatest Dancer, p281) |
| [[Tempus Fugit Creme de Menthe]] | standard | Made with peppermint and spearmint plus secret botanicals; a deeply complex spectrum of minty flavors that can match the other spirits in a drink |
| [[White creme de menthe]] | standard |  |

### Mole bitters (1)
| Bottle | Style | Character |
|---|---|---|
| [[Bittermens Xocolatl mole bitters]] | standard | A popular savory bitters: rich chocolate flavor and a hint of chile heat. Amplifying |

### Orange bitters (3)
| Bottle | Style | Character |
|---|---|---|
| [[Angostura Orange Bitters]] | standard |  |
| [[Fee Brothers West Indian Orange Bitters]] | standard |  |
| [[Regans' Orange Bitters]] | standard |  |

### Orange liqueur (5)
| Bottle | Style | Character |
|---|---|---|
| [[Grand Marnier]] | Cognac-based | A foundation of aged Cognac gives this orange liqueur greater depth, though it can limit its usefulness in cocktails. The authors like mixing it with rum in classics like the Mai Tai and the Dark Horse |
| [[Giffard blue curacao]] | blue curacao |  |
| [[Pierre Ferrand dry curacao]] | dry curacao | Extremely dry curacao, bone-dry and bracing; the book pairs it with Pierre Ferrand Ambre Cognac and adds a bit of simple syrup to harmonize |
| [[Cointreau]] | triple sec | Orange liqueur, about 80 proof. Medium sweetness, between bone-dry Pierre Ferrand dry curacao and sweet Grand Marnier (book p154-155) |
| [[Royal Combier]] | *blank* |  |

### Peach liqueur (4)
| Bottle | Style | Character |
|---|---|---|
| [[Giffard Creme de Peche]] | standard |  |
| [[Giffard Creme de Peche de Vigne]] | standard |  |
| [[Massenez Creme de Peche]] | standard | By far the authors' favorite peach liqueur: little cooked flavor, useful in citrusy and stirred cocktails, keeping the profile light and refreshing |
| [[Mathilde peach liqueur]] | standard |  |

### Pear liqueur (3)
| Bottle | Style | Character |
|---|---|---|
| [[St. George spiced pear liqueur]] | spiced |  |
| [[Clear Creek pear liqueur]] | standard | Made on the Clear Creek pear brandy base: deeply structured and complex, with more roasted flavors than Mathilde, a brilliant match for aged spirits and oxidized wines such as amontillado and oloroso sherries |
| [[Mathilde Pear Liqueur]] | standard | Focused aroma and flavor of fresh pears, on a pear brandy base: all fresh pear, all the time. Chosen to add sharp pear texture to citrusy cocktails |

### Pecan bitters (1)
| Bottle | Style | Character |
|---|---|---|
| [[Miracle Mile Toasted Pecan Bitters]] | standard |  |

### Pineau des Charentes (2)
| Bottle | Style | Character |
|---|---|---|
| [[Pasquet Pineau des Charentes]] | standard |  |
| [[Pineau des Charentes]] | standard |  |

### Pisco (5)
| Bottle | Style | Character |
|---|---|---|
| [[Campo de Encanto Grand and Noble pisco]] | acholado | Born for cocktails: a blend of Quebranta, Torontel, Moscatel and Italia grapes, clean, brightly aromatic, smooth on the palate, distilled to proof without anything added |
| [[Capurro Pisco Acholado]] | acholado | All the iconic aromas and flavors of pisco (bright stone fruits and flowers) with something uniquely earthy that lets it shine in stirred cocktails, especially Martini riffs with blanc vermouth |
| [[Campo de Encanto Moscatel pisco]] | moscatel |  |
| [[Macchu Pisco]] | quebranta | Made in the same area as Campo de Encanto, from only Quebranta grapes, a nonaromatic variety. Less floral than many piscos but still full-bodied and flavorful; a great base for sour-style cocktails |
| [[Kappa pisco]] | *blank* |  |

### Port (5)
| Bottle | Style | Character |
|---|---|---|
| [[Graham's Six Grapes Ruby Port]] | ruby | Book pick: plum, raspberry and blackberry up front over a structured wine with coconut notes. If you stock only one ruby, this one. See _Notes - Port |
| [[Sandeman Ruby Port]] | ruby | Consistent and affordable; a bit sweeter than Graham's, jammier bramble-fruit flavor. See _Notes - Port |
| [[Otima 10-Year Tawny Port]] | tawny | Gentle: aged enough for woodsy structure but still fresh, vibrant berry flavors. Not bland like older or denser ports; the authors like it with Cognac or Calvados in Manhattan-style drinks. See _Notes - Port |
| [[Tawny Port]] | tawny | Blend of multiple vintages, not meant for bottle aging. A young tawny adds depth while staying fresh and juicy; see _Notes - Port |
| [[Quinta do Infantado white port]] | white |  |

### Raspberry liqueur (1)
| Bottle | Style | Character |
|---|---|---|
| [[Clear Creek Raspberry Liqueur]] | standard | Good balance of sweet and tart without being too jammy; a little goes a long way. In citrus cocktails often paired with an equal amount of simple syrup to balance lemon juice |

### Rhum agricole (5)
| Bottle | Style | Character |
|---|---|---|
| [[La Favorite Ambre rhum agricole]] | aged | Amber rhum agricole used in small amount in Jump in the Line |
| [[Neisson Reserve Speciale]] | aged | Martinique. Pricey, nutty and highly aged; generally reserved for sipping, though it makes a truly unique Old-Fashioned (try it in a Daiquiri just once) |
| [[Rhum JM VSOP]] | aged | Martinique. Orange and chocolate flavors balanced by just enough oak; lingering buttery finish. A fine sipper and useful in spirituous cocktails alone or alongside bourbon or Calvados |
| [[La Favorite Coeur de Canne rhum agricole blanc]] | blanc | Martinique. A fantastically affordable rhum agricole: light, fruity, with the aroma of fresh green grass. Loved in tropical-style cocktails, especially with pineapple (juice or syrup) |
| [[Neisson rhum agricole blanc]] | blanc |  |

### Rum (29)
| Bottle | Style | Character |
|---|---|---|
| [[Hamilton Jamaican Pot Still Dark]] | Jamaican pot still | Jamaica. As much personality as Smith & Cross but less sweetness; refined enough for larger quantities but a pungent aroma. A Daiquiri with it is rich and refreshing, with a lingering banana flavor |
| [[Hamilton Jamaican pot still gold rum]] | Jamaican pot still | Imported by drinks writer Ed Hamilton. Falls between the feistiness of Wray & Nephew and the density of dark and aged Jamaican rums; used with other rums for the core of a Mai Tai |
| [[Smith & Cross]] | Jamaican pot still | Jamaica. Hands down the least nuanced spirit: funky, deeply sweet, high proof (a gasoline-and-molasses smell after years in oak), but in very small quantities adds a tropical slant, like a less potent bitters |
| [[Appleton Estate 21-year rum]] | aged |  |
| [[Appleton Estate Reserve Blend]] | aged | Jamaica |
| [[Appleton Estate Reserve Blend rum]] | aged |  |
| [[Appleton Signature Blend rum]] | aged | Jamaican rum used in the book's Zombie Punch |
| [[Bacardi 8-year aged rum]] | aged |  |
| [[Cana Brava 7-year rum]] | aged | Aged Panamanian rum used in Indulge. See also Cana Brava white rum |
| [[El Dorado 12-Year rum]] | aged |  |
| [[El Dorado 15-Year]] | aged | Guyana. Dark amber, complex nose, shares qualities with fine aged brandy. Good as a sipper or in Old-Fashioneds, Juleps or Manhattan-style drinks, either as sole core or alongside other aged spirits |
| [[Plantation Barbados 5-year rum]] | aged | Aged Barbados rum used in the book's single-serving Eggnog |
| [[Ron del Barrilito Three Stars]] | aged | Puerto Rico. Availability comes and goes, but one of the book's favorites: aged six to ten years yet fresh like lighter rums. Used as a base and to stretch strong-personality rums (Jamaican, rhum agricole) |
| [[Santa Teresa 1796 rum]] | aged |  |
| [[Zacapa 23]] | aged | Guatemala. A blend of rums aged six to twenty-five years in a solera system: deeply complex, great for sipping and as the base for spirituous cocktails (Old-Fashioned or Manhattan riffs) |
| [[Zacapa 23 rum]] | aged |  |
| [[Cruzan Black Strap]] | dark | US Virgin Islands. Dark as a moonless night, with rich molasses and maple syrup flavors; not a utility player. Mostly used in small quantities to add depth (Pina Colada, p269) |
| [[Gosling's Black Seal]] | dark | Bermuda. A Dark and Stormy isn't one without its dark molasses flavor |
| [[Gosling's Black Seal rum]] | dark |  |
| [[Hamilton Demerara 151 Overproof rum]] | overproof | Aged 151-proof Demerara rum ("firewater") used in the Zombie Punch |
| [[Plantation Old-Fashioned Traditional Dark Overproof]] | overproof | Trinidad and Tobago. 69% ABV, masked by a big punch of smoked fruit flavors, dangerously easy to sip straight. Perfect for deepening tiki-style cocktails |
| [[Wray & Nephew White Overproof]] | overproof | Jamaica, 126 proof. The alcoholic kick suppresses Jamaican funk, which can be dangerous in a Daiquiri (delicious but too drinkable). Used when a drink's flavors are good but dense: a small dose spreads them out |
| [[Barbancourt White]] | white | Haiti. Enough personality to be distinctive but not so much that it dominates like other French-style rums; a beautiful addition to any Daiquiri lover's bar (aged bottlings also loved) |
| [[Cana Brava white rum]] | white | Light Spanish-style white rum. Panama. Created specifically for cocktail use by the 86 Co.; an homage to old-style Cuban rums like Havana Club (the US-market Havana Club is not the same thing) |
| [[Diplomatico Blanco Reserve rum]] | white |  |
| [[El Dorado White Rum]] | white | Guyana. Great, inexpensive rum for Daiquiri-style cocktails; modest personality gets overpowered in spirituous cocktails, so stick to sours |
| [[Flor de Cana 4-Year White]] | white | Nicaragua. A bit more funk than other light rums (in a good way); its personality comes through distinctively in cocktails |
| [[Flor de Cana 4-year white rum]] | white |  |
| [[Plantation 3 Stars White]] | white | Jamaica, Barbados and Trinidad blend that performs very much like a Spanish-style rum |

### Rye whiskey (6)
| Bottle | Style | Character |
|---|---|---|
| [[Bulleit rye]] | standard |  |
| [[George Dickel rye]] | standard |  |
| [[Old Overholt rye]] | standard |  |
| [[Rittenhouse Rye]] | standard |  |
| [[Russell's Reserve 6-Year Rye]] | standard | All the spicy rye character you'd expect, balanced by a floral aroma and fruity flavor, with a subtle sweetness. Fantastic in Old-Fashioned and Manhattan-style cocktails, and soft enough to mix with citrus |
| [[Russell's Reserve rye]] | standard |  |

### Sake (1)
| Bottle | Style | Character |
|---|---|---|
| [[Narutotai Ginjo Nama Genshu sake]] | standard |  |

### Scotch (10)
| Bottle | Style | Character |
|---|---|---|
| [[Bowmore 12-Year]] | Islay | Islay. Of the Islay single malts, the most restrained smoky peat: not lacking smoke, but with orangey citrus and vanilla beneath it, more nuanced than Lagavulin, Ardbeg and Laphroaig |
| [[Laphroaig 10-year scotch]] | Islay | Peaty Islay scotch. Islay. Intensely smoky and briny; a few drops can flavor a cocktail |
| [[Auchentoshan Three Wood]] | Lowland | Lowlands. Triple distilled (rather than twice) and aged in three types of oak: former bourbon barrels for up to twelve years, then oloroso sherry barrels for one year, then Pedro Ximenez barrels for one year |
| [[Highland Park 12-year scotch]] | Orkney | Orkney Islands. Possibly the authors' favorite go-to sipping single malt, for its elegance and affordable price |
| [[The Glenlivet 12-Year]] | Speyside | Highlands (Speyside). Elegant and floral with a touch of honey; massively produced and consistently delicious if not terribly complex |
| [[Compass Box Asyla]] | blended | Blended scotch. All elegance: fruity core flavor topped with spice notes, but gentler and more reminiscent of fresh apple than cooked |
| [[Compass Box Oak Cross]] | blended | Blended scotch: three single malts combined and aged six months in both American and French casks |
| [[Balvenie Doublewood 12-year scotch]] | *blank* |  |
| [[Bank Note scotch]] | *blank* |  |
| [[Famous Grouse Scotch]] | *blank* |  |

### Sherry (19)
| Bottle | Style | Character |
|---|---|---|
| [[Lustau East India solera sherry]] | East India | Raisiny sherry. Book: mostly oloroso with a little PX, aged 3 years in a warmer part of the bodega to mimic old long sea voyages; woodsy bite and structure |
| [[Gonzalez Byass Noe Pedro Ximenez]] | Pedro Ximenez | Average age about 30 years; extremely concentrated and viscous (raisins, figs, cinnamon, anise). Too expensive to mix freely, but 1 tsp goes a long way, e.g. in place of the sweetener in a rum Old-Fashioned |
| [[Lustau San Emilio Pedro Ximenez]] | Pedro Ximenez | Rich, sweet, full-bodied PX (raisins, figs, nuts, molasses, baking spices) with vibrant acidity |
| [[Alexander Jules amontillado sherry]] | amontillado |  |
| [[Amontillado Sherry]] | amontillado |  |
| [[Barbadillo Principe Amontillado]] | amontillado | Amontillado with dried-fruit aromas; its saltiness is always present, so it acts as extra seasoning in cocktails (brightens citrus, curbs bitterness) and differs from a Jerez amontillado like Lustau Los Arcos |
| [[Lustau Los Arcos amontillado sherry]] | amontillado |  |
| [[Alexander Jules fino sherry]] | fino |  |
| [[Gonzalez Byass Tio Pepe Fino]] | fino | Benchmark fino sherry: pale hay color, fresh-bread aroma, extremely dry with a hint of nuttiness. Straightforward, so a good utility player in cocktails. Recommended on p246 of the book. See _Notes - Sherry |
| [[Lustau Jarana fino sherry]] | fino |  |
| [[Lustau La Ina fino sherry]] | fino | Lustau's fino with slightly more body than the Jarana. See _Notes - Sherry |
| [[Lustau Puerto fino sherry]] | fino |  |
| [[La Gitana manzanilla sherry]] | manzanilla | Dry and salty manzanilla; used in La Valencia |
| [[Manzanilla Sherry]] | manzanilla |  |
| [[Lustau Emilin Moscatel]] | moscatel | Affordable, widely available Moscatel aged 8 years: sweet and rich, dried fruit (especially prunes) and an orangey flavor. See _Notes - Sherry |
| [[Gonzalez Byass Matusalem oloroso sherry]] | oloroso | Deep, complex oloroso sherry chosen as the core of the book's Ideal Flip. Average age about 30 years in a solera |
| [[Lustau Almacenista Pata de Gallina Oloroso]] | oloroso | Step up from Lustau's entry-level Don Nuno oloroso (around $25): bone-dry finish with a broad, chocolatey, spicy body, not sweet |
| [[Lustau Peninsula Palo Cortado]] | palo cortado | Reasonably priced palo cortado between an amontillado's dryness and an oloroso's richness: big dried-fruit aroma, deep nutty flavor. See _Notes - Sherry |
| [[Williams & Humbert Dry Sack sherry]] | *blank* |  |

### Singani (1)
| Bottle | Style | Character |
|---|---|---|
| [[Singani 63]] | standard | Bolivian grape-based spirit |

### Sloe gin (1)
| Bottle | Style | Character |
|---|---|---|
| [[Plymouth sloe gin]] | standard |  |

### Spanish brandy (3)
| Bottle | Style | Character |
|---|---|---|
| [[Cardenal Mendoza Solera Gran Reserva]] | solera | Aged fifteen to seventeen years in former oloroso and Pedro Ximenez sherry casks: onslaught of prunes and raisins, sweet nutty chocolate flavor that lasts |
| [[Gran Duque de Alba Solera Gran Reserva]] | solera | William & Humbert's brandy was for many years the only widely available Spanish brandy in the US, so it set expectations for the category |
| [[Lustau Brandy de Jerez Solera]] | solera | The bodega responsible for some of the authors' favorite sherries also makes some of the best-priced Brandy de Jerez |

### Sparkling wine (4)
| Bottle | Style | Character |
|---|---|---|
| [[Cava]] | Cava | Spanish sparkling wine used in King's Landing |
| [[Dry Champagne]] | Champagne |  |
| [[Rose Cremant]] | Cremant |  |
| [[Prosecco]] | Prosecco |  |

### Strawberry liqueur (1)
| Bottle | Style | Character |
|---|---|---|
| [[Giffard Creme de Fraise des Bois]] | standard | Made from wild strawberries: a lot of depth and personality, with a subtle underlying herbal quality like fresh grass |

### Sweet vermouth (6)
| Bottle | Style | Character |
|---|---|---|
| [[Dolin Rouge]] | French | A sweet French vermouth, much lighter and softer than the Italian style: useful with spirits that need coddling (e.g |
| [[Dolin Sweet Vermouth]] | French |  |
| [[Carpano Antica Formula vermouth]] | Italian |  |
| [[Cinzano Rosso]] | Italian | Shares its Torino heritage with other sweet vermouths but less aggressive than Carpano Antica Formula, so more versatile |
| [[Cocchi Vermouth di Torino]] | Italian |  |
| [[Casa Mariol Vermut Negre]] | *blank* |  |

### Tequila (13)
| Bottle | Style | Character |
|---|---|---|
| [[Pueblo Viejo Anejo tequila]] | anejo | Affordable, sweet vanilla and orange. A stand-in for bourbon, good in citrusy drinks and Manhattans, but lacks the structure to star in an Old-Fashioned |
| [[Cabeza blanco tequila]] | blanco |  |
| [[Cimarron Blanco tequila]] | blanco |  |
| [[Espolon blanco tequila]] | blanco |  |
| [[Pueblo Viejo Blanco tequila]] | blanco |  |
| [[Siembra Azul blanco tequila]] | blanco | From David Suro. Clean, floral aroma and a fruity palate; works in all cocktails. Used in the Margarita (Classic) |
| [[Siete Leguas Blanco tequila]] | blanco | Bright, earthy and velvety with a hint of vanilla. Good with blanc vermouth and liqueurs, especially peach; works well in stirred drinks |
| [[Cimarron Reposado tequila]] | reposado | A rare affordable aged tequila that adds aged complexity |
| [[Don Julio Reposado tequila]] | reposado | A balance of vegetal agave and cinnamon/toasty oak; good in stirred drinks or in small seasoning amounts |
| [[El Tesoro Reposado tequila]] | reposado |  |
| [[Fortaleza reposado tequila]] | reposado |  |
| [[Olmeca Altos reposado tequila]] | reposado |  |
| [[Siembra Azul reposado tequila]] | reposado |  |

### Vanilla liqueur (1)
| Bottle | Style | Character |
|---|---|---|
| [[Giffard Vanille de Madagascar]] | standard | Vanilla liqueur. Flavored with extracts of Madagascar vanilla: a straightforward single-flavor liqueur |

### Violet liqueur (2)
| Bottle | Style | Character |
|---|---|---|
| [[Giffard Creme de Violette]] | standard | Deeply purple with a vibrant violet aroma and just the right sweetness: sweet, but the sugar doesn't dumb down the floral violets |
| [[Creme Yvette]] | *blank* |  |

### Vodka (6)
| Bottle | Style | Character |
|---|---|---|
| [[Absolut Elyx vodka]] | standard | Wheat-based; smooth, slightly sweet and soft, giving a Martini softness and rich body |
| [[Absolut vodka]] | standard | Distilled from winter wheat grown in southern Sweden; a softness that suits many applications, especially citrus drinks, but also savory ones like a Bloody Mary |
| [[Aylesbury Duck vodka]] | standard |  |
| [[Belvedere vodka]] | standard | Rye-based; a subtle peppery spice note that's especially welcome in dry Martinis |
| [[Grey Goose vodka]] | standard |  |
| [[Hangar 1 vodka]] | standard | Small distillery near San Francisco; the straight vodka is a grain and grape distillate, with some wheat softness plus fruity, floral grape character |

### Whiskey (other) (1)
| Bottle | Style | Character |
|---|---|---|
| [[Wyoming Whiskey]] | *blank* |  |

### White wine (1)
| Bottle | Style | Character |
|---|---|---|
| [[Chardonnay]] | standard | Dry, unoaked, fruity |


## Added from home inventory
- [[Planteray Xaymaca Special Dry rum]]: Rum / Jamaican pot still
- [[Xicala Mezcal Joven]]: Mezcal / (blank)
- [[Four Roses Small Batch bourbon]]: Bourbon / standard
- [[Espolon reposado tequila]]: Tequila / reposado
- [[Amaro Sfumato Rabarbaro]]: Amaro / (blank)
- [[Distillerie du Peyrat Organic Selection cognac]]: Cognac / VS
- [[Chateau des Plassons VSOP cognac]]: Cognac / VSOP
- [[Beaver Pond Nectarine Brandy]]: Eau-de-vie / nectarine
- [[Johnnie Walker Black Label scotch]]: Scotch / blended
- [[Rockey's Botanical Liqueur]]: Herbal liqueur / (blank)
- [[Leroux Triple Sec]]: Orange liqueur / triple sec
- [[Homemade vanilla liqueur]]: Vanilla liqueur / standard
- [[Homemade vanilla bourbon liqueur]]: Vanilla liqueur / standard
- [[Homemade cherry liqueur]]: Cherry liqueur / standard
- [[Homemade raspberry liqueur]]: Raspberry liqueur / standard
- [[Homemade blackberry liqueur]]: Blackberry liqueur / standard
- [[Homemade sage liqueur]]: Herbal liqueur / (blank)
