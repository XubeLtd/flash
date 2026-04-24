from glob import glob
import pathlib
import argparse
from littlefs import LittleFS

parser = argparse.ArgumentParser(description="LittleFS image builder")
parser.add_argument("-s", "--source", type=str, help="Source directory to build the image from", required=True)
parser.add_argument("-d", "--dest", type=str, help="Destination file name for the image", required=True)
parser.add_argument("-b", "--blocksize", type=int, help="Block size in bytes", required=True)
parser.add_argument("-c", "--blockcount", type=int, help="Block count", required=True)
parser.add_argument("-r", "--readsize", type=int, help="Read size in bytes", required=True)
parser.add_argument("-p", "--progsize", type=int, help="Program size in bytes", required=True)
parser.add_argument("-a", "--cachesize", type=int, help="Cache size in bytes", required=True)
parser.add_argument("-e", "--blockcycles", type=int, help="Block cycles", required=True)
parser.add_argument("-l", "--lookahead", type=int, help="Lookahead size in bytes", required=True)
args = parser.parse_args()

print("Building LittleFS image from source directory: " + args.source + " to destination file: " + args.dest + " with block size: " + str(args.blocksize) + " and block count: " + str(args.blockcount))

fs = LittleFS(
    block_size=args.blocksize, block_count=args.blockcount,
    read_size=args.readsize, prog_size=args.progsize,
    block_cycles=args.blockcycles, cache_size=args.cachesize,
    lookahead_size=args.lookahead)

# Create filelist
location = pathlib.Path(args.source).rglob("*")
for item in location:
    if item.is_file():
        file_dst_path = item.relative_to(args.source)
        file_src_path = item
        print(f"Adding {file_dst_path}, from {file_src_path}...")
        with open(file_src_path, 'rb') as f:
            data = f.read()
        # Create the directory structure in the LittleFS
        parent_dir = str(file_dst_path.parent).replace("\\", "/")
        fs.makedirs(parent_dir, exist_ok=True)
        # Write the file to the LittleFS
        file_dst_path = str(file_dst_path).replace("\\", "/")
        with fs.open(file_dst_path, 'wb') as fh:
            fh.write(data)

print("Writing LittleFS image to destination file: " + args.dest)
with open(args.dest, 'wb') as fh:
    fh.write(fs.context.buffer)
