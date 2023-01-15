import requests
import json
import os
import sys


def getBlessingKey(blessing):
    return blessing.lower().replace(" ", "")


def handlePercent(val):
    floatval = float(val)
    if floatval > 1.0:
        floatval /= 100
    return floatval


def getVoteEntry(label, value, includeInTotal, votetype, order):
    return {
        "label": label,
        "value": value,
        "includeInTotal": includeInTotal,
        "type": votetype,
        "order": order,
    }


def getWills():
    wills = []
    while True:
        willname = input("Will name, blank to end: ")
        if not willname:
            break
        percent = handlePercent(input("Percent: "))
        wills.append((willname, percent))
    return [getVoteEntry(willname, percent, True, "will", order) for order, (willname, percent) in enumerate(wills, start=-len(wills))]


def getBlessings(orderedBlessings):
    blessings = []
    while True:
        blessingname = input("Blessing name, blank to end: ")
        if not blessingname:
            break
        blessingname = blessingname.replace("’", "'")
        percent = handlePercent(input("Percent: "))
        blessings.append((blessingname, percent))
    return [getVoteEntry(blessingname, percent, True, "blessing", orderedBlessings.get(getBlessingKey(blessingname), 50)+1) for blessingname, percent in blessings]


def getWimdys(orderedBlessings):
    wimdys = []
    while True:
        wimdy = input("Wimdy blessing name, blank to end: ")
        if wimdy:
            wimdys.append(wimdy.replace("’", "'"))
        else:
            break
    return sorted(wimdys, key=lambda wimdy: orderedBlessings.get(getBlessingKey(wimdy), 50))


def getOther():
    others = []
    while True:
        otherlabel = input("Label, blank to end: ")
        if not otherlabel:
            break
        percent = handlePercent(input("Percent: "))
        others.append((otherlabel, percent))
    return [getVoteEntry(otherlabel, percent, False, "other", order) for order, (otherlabel, percent) in enumerate(others, start=1000)]


def main(output):
    print("Welcome to the Voting Guide JSON Generator!")
    season = int(input("Season: "))
    guideurl = input("Guide URL: ")
    outputval = {"season": season, "guideurl": guideurl, "votetypes": []}
    votetypes = []
    try:
        orderedBlessings = {getBlessingKey(blessing["title"]): idx for idx, blessing in enumerate(requests.get("https://www.blaseball.com/database/offseasonSetup").json()["blessings"])}
    except requests.exceptions.JSONDecodeError:
        orderedBlessings = {}
    while True:
        print("1) Wills\n2) Blessings\n3) Wimdys\n4) Other\n0) Output and Quit")
        selection = input("Make a selection: ")
        if selection == "1":
            votetypes.extend(getWills())
        if selection == "2":
            votetypes.extend(getBlessings(orderedBlessings))
        if selection == "3":
            wimdyname = input("Wimdy label (default 'WIMDY!'): ") or "WIMDY!"
            wimdypct = handlePercent(input("Wimdy percent: "))
            votetypes.append(getVoteEntry(wimdyname, wimdypct, True, "wimdy", 100))
            outputval["wimdys"] = getWimdys(orderedBlessings)
        if selection == "4":
            votetypes.extend(getOther())
        if selection == "0":
            break
    outputval["votetypes"] = votetypes
    with open(output, "w") as f:
        json.dump(outputval, f, indent=2)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Specify output file path as the only program argument")
        sys.exit(-1)
    main(sys.argv[1])
