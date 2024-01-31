# GG-Quotes #
An API for Guilty Gear quotes!

## Tech Stack ##
### Front-End ###

TBD

### Back-End ###

To start running server (dev then prod respectively):
```
npm --prefix ./back-end run server
npm --prefix ./back-end run start
```

Tech Stack:
- Node.js
- Express
- MongoDB

&nbsp;

# API Docs #
## Pagination _(Group)_ ##
Calling any Group API without its following singular noun form endpoint will return a paginated list of available resources for that API Group. By default, a list "page" will contain up to 10 resources. If you would like to change this just add a 'limit' query parameter to the GET request, e.g. ?limit=20. You can use 'page' to move to the next page, e.g. ?limit=20&page=3.
### Named (endpoint) ###
```GET http://<future-host-name>/api/{group}```\
&nbsp;
_Note: group is equal to "quotes" in below example output_
```
"results": [
    {
        "id": 101,
        "quote": "Projectiles are bullshit.",
        "daredevil": {
            "id": 1,
            "firstName": "Sol",
            "lastName": "Badguy",
            "officialArtwork":
                "https://www.guiltygear.com/ggst/en/wordpress/wp-content/uploads/2020/09/chara@pc.webp"
        }
    },
    {
        "id": 102,
        "quote": "Projectiles are not bullshit.",
        "daredevil": {
            "id": 1,
            "firstName": "Sol",
            "lastName": "Badguy",
            "officialArtwork": "https://www.guiltygear.com/ggst/en/wordpress/wp-content/uploads/2020/09/chara@pc.webp"
        }
    }
],
"totalPages": 1,
"currentPage": 1
```

### NamedAPIResourceList _(type)_ ###
| Name    | Description | Type |
| --------| ------------| -----|
| results  | List of the identified resource    | list NamedAPIResource |
| totalPages | Total number of pages based on limit | Number |
| currentPage    | The daredevil who said this quote    | Number |

&nbsp;

## Quotes _(Group)_ ##
### Quote _(endpoint)_ ###
Quotes said by the cast of Guilty Gear. The quotes range from wtf to inspirational. All quotes are collected from external sources (Reddit threads, wikis, etc.).

_Note: id for specific quote OR null for random quote_\
&nbsp;
```GET http://<future-host-name>/api/quotes/quote/{id or null}```
```
"id": 101,
"quote": "Projectiles are bullshit.",
"daredevil": {
    "id": 1,
    "firstName": "Sol",
    "lastName": "Badguy",
    "officialArtwork": "https://www.guiltygear.com/ggst/en/wordpress/wp-content/uploads/2020/09/chara@pc.webp"
}
```

### Quote _(type)_ ###
| Name    | Description | Type |
| --------| ------------| -----|
| id  | The identifier for this resource    | Number |
| quote | The quote itself     | String |
| daredevil    | The daredevil who said this quote    | Daredevil |

### Daredevil _(type)_ ###
| Name    | Description | Type |
| --------| ------------| -----|
| id  | The identifier for this resource    | Number |
| firstName | First name of daredevil     | String |
| lastName    | Last name of daredevil    | String |
| officialArtwork | URL for artwork of daredevil | String |

&nbsp;

## Daredevils _(Group)_ ##
### Daredvil _(endpoint)_ ###
The fighter themselves.

_Note: id for specific daredevil OR null for random daredevil_\
&nbsp;
```GET http://<future-host-name>/api/daredevils/daredevil/{id or null}```
```
"id": 1,
"firstName": "Sol",
"lastName": "Badguy",
"officialArtwork": "https://www.guiltygear.com/ggst/en/wordpress/wp-content/uploads/2020/09/chara@pc.webp",
"quotes": [
    {
        "id": 101,
        "quote": "Projectiles are bullshit."
    },
    {
        "id": 102,
        "quote": "Projectiles are not bullshit."
    }
]
```

### Daredevil _(type)_ ###
| Name    | Description | Type |
| --------| ------------| -----|
| id  | The identifier for this resource    | Number |
| firstName | First name of daredevil     | String |
| lastName    | Last name of daredevil    | String |
| officialArtwork | URL for artwork of daredevil | String |
| quotes | List of quotes daredevil has said | Quote

### Quote _(type)_ ###
| Name    | Description | Type |
| --------| ------------| -----|
| id  | The identifier for this resource    | Number |
| quote | The quote itself     | String |

&nbsp;

# Notes #

|          |                                                                                                                                      |
|----------|--------------------------------------------------------------------------------------------------------------------------------------|
| 1/28/24  | Completed MVP of backend. Attempting to deploy application online through Azure. Having difficulty running it succesfully thought :( | 
| 1/29/24  | Addition of Daredevil Model. Changed Quotes Model to reflect Daredevil (refs) and logic that comes with it. IE deleting one deletes others or id decrement logic. |
| 1/30/24 | Merged endpoints of GET random & specific with query together. Implemented pagination for both Groups/Models. Also wrote documentation for API's public funcitonality/endpoints (ripped tf off from PokéAPI, thank you).

