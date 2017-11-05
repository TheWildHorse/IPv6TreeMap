import bz2
import json
import sys

def load_archive(fn):
	probes = {}
	compressed = bz2.BZ2File(fn)
	probes = json.loads(compressed.read())
	probes = probes["objects"]
	return probes

def count_asns(archive):
	v4counts  = {}
	v6counts  = {}

	v4diffcounts = {}
	v6diffcounts = {}

	v6nodes = {}
	v4nodes = {}

	v6uptime = {}
	v4uptime = {}

	for probe in archive:
		if probe["asn_v6"] is not None:
			asn = probe["asn_v6"]
			v6counts.setdefault(asn, set())
			v6counts[asn].add(probe["id"])

			#print "Added v6 probe "+str(probe["id"])+ " to ASN "+str(asn)

		if probe["asn_v4"] is not None:
			asn = probe["asn_v4"]
			v4counts.setdefault(asn, set())
			v4counts[asn].add(probe["id"])

			#print "Added v4 probe "+str(probe["id"])+ " to ASN "+str(asn)

		if probe["status_name"] == "Connected" and probe["asn_v6"] is not None and probe["asn_v4"] is not None and probe["asn_v4"] != probe["asn_v6"]:
			asn = probe["asn_v6"]
			v6diffcounts.setdefault(asn, set())
			v6diffcounts[asn].add(probe["id"])

			asn = probe["asn_v4"]
			v4diffcounts.setdefault(asn, set())
			v4diffcounts[asn].add(probe["id"])

		if probe["status_name"] == "Connected" and probe["asn_v6"] is not None:
			country_code = probe["country_code"]
			v6nodes[country_code] = v6nodes.get(country_code, 0) + 1
			v6uptime[country_code] = v6uptime.get(country_code, 0) + probe["total_uptime"]

			print "v6probe "+str(probe["id"])+ " to cc "+str(country_code)

		if probe["status_name"] == "Connected" and probe["asn_v4"] is not None:
			country_code = probe["country_code"]
			v4nodes[country_code] = v4nodes.get(country_code, 0) + 1
			v4uptime[country_code] = v4uptime.get(country_code, 0) + probe["total_uptime"]

			print "v4probe "+str(probe["id"])+ " to cc "+str(country_code)

	return (v6counts, v4counts, v6diffcounts, v4diffcounts, v6nodes, v6nodes, v6uptime, v4uptime)


def settostr(a):
	return ",".join(map(str, list(a)))

def main():

	verbose = False

	if len(sys.argv) <= 1:
		print "Give me a filename, foo.bz2"
		sys.exit(1)

	fn=sys.argv[1]
	archive = load_archive(fn)

	# these are dicts, ASN -> set(probeIDs)
	(v6, v4, v6diff, v4diff, v6nodes, v4nodes, v6uptime, v4uptime) = count_asns(archive)

	for cc in v6nodes:
		print cc, v6nodes[cc]

	with open('v6atlas.json', 'w') as fp:
		json.dump(v6nodes, fp)

	with open('v4atlas.json', 'w') as fp:
		json.dump(v4nodes, fp)

	with open('v6atlasuptime.json', 'w') as fp:
		json.dump(v6uptime, fp)

	with open('v4atlasuptime.json', 'w') as fp:
		json.dump(v4uptime, fp)


if __name__ == "__main__":
	main()