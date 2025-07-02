import pandas as pd
import numpy as np
import argparse
import json

parser = argparse.ArgumentParser()
parser.add_argument('--input_csv_file' )

# number of bin
N = 12
vest_position = ['L', 'K', 'J', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A']

# normal region 
xmin = -0.3
xmax = +0.3
ymin = -0.1
ymax = +0.4

# compensation mass
mass = 2.5



def wght_computation(args):
    filename = args.input_csv_file
    sensing_data = pd.read_csv(filename)
    input_vector = np.hstack( [ np.asarray( sensing_data.roll ).reshape( [-1, 1]), np.asarray( sensing_data.pitch ).reshape( [-1, 1])] )
    x = input_vector[:,0]
    y = input_vector[:,1]

    abnormal_samples = np.logical_or( np.logical_or( x < xmin, x > xmax), np.logical_or( y < ymin, y > ymax) )
    input_vector = input_vector[ abnormal_samples , :]

    orientation =  np.arctan2( input_vector[:,1], input_vector[:,0]) * 180.0/ np.pi
    bins = np.linspace( -180, 180, N+1 )

    freq, bins = np.histogram( orientation, bins )

    dominant_vectors = np.zeros( [N,2] )
    dominant_lengths = np.zeros( [N,1])

    for i in range(N):
        idx = np.logical_and( orientation > bins[i], orientation <= bins[i+1])
        vectors = input_vector[idx,:]    
        if np.all( idx == False ):
            maxlength = 0.0
        else:
            lengths = np.sqrt( np.sum( vectors**2, axis=1) )
            max_idx = np.argmax( lengths  )
            max_length = lengths[max_idx]
            dominant_vectors[i] = vectors[max_idx]
            dominant_lengths[i] = max_length
        """
        print( "Between {} and {},  ".format(bins[i],bins[i+1]) )
        print( "there are {} samples.".format(vectors.shape[0]) )
        print( "Among them, the largest vector length is {}".format(max_length))
        """

    orientation_of_four_corners = np.array( [np.arctan2( ymin, xmin ), np.arctan2( ymin, xmax ), np.arctan2( ymax, xmax ), np.arctan2( ymax, xmin )] ) 

    for i in range(N):
        if dominant_lengths[i] < 1e-5:
            continue
        cur_orientation = np.arctan2( dominant_vectors[i,1], dominant_vectors[i,0] )
        if cur_orientation < orientation_of_four_corners[0]:
            dominant_lengths[i] -= np.fabs( xmin/np.cos( cur_orientation) )
        elif cur_orientation < orientation_of_four_corners[1]:
            dominant_lengths[i] -= np.fabs( ymin/np.sin( cur_orientation) )
        elif cur_orientation < orientation_of_four_corners[2]:
            dominant_lengths[i] -= np.fabs( xmax/np.cos( cur_orientation) )
        elif cur_orientation < orientation_of_four_corners[3]:
            dominant_lengths[i] -= np.fabs( ymax/np.sin( cur_orientation) )
        else:
            dominant_lengths[i] -= np.fabs( xmin/np.cos( cur_orientation) )

    total_length = np.sum(dominant_lengths)
    if total_length == 0:
        mass_assignment = np.zeros_like(dominant_lengths)
    else:
        mass_assignment = mass * dominant_lengths / total_length
    mass_assignment = mass_assignment.reshape([-1])

    results = {}
    for i in range(N):
        results[vest_position[i]] = mass_assignment[i]

    print(json.dumps(results))

if __name__ == "__main__":
    args = parser.parse_args()
    wght_computation(args)