import json
import math

def rgb_to_hex(r, g, b):
    return '#{{:02x}}{{:02x}}{{:02x}}'.format(int(r*255), int(g*255), int(b*255))

def figma_gradient_to_direction(handles):
    if not handles or len(handles) < 2:
        return 'to-b'
    start = handles[0]
    end   = handles[1]
    dx = end['x'] - start['x']
    dy = end['y'] - start['y']
    angle = math.degrees(math.atan2(dy, dx))
    if   -22.5 <= angle < 22.5:    return 'to-r'
    elif  22.5 <= angle < 67.5:    return 'to-br'
    elif  67.5 <= angle < 112.5:   return 'to-b'
    elif  112.5 <= angle < 157.5:  return 'to-bl'
    elif  abs(angle) >= 157.5:     return 'to-r'
    elif -157.5 <= angle < -112.5: return 'to-tl'
    elif -112.5 <= angle < -67.5:  return 'to-b'
    elif  -67.5 <= angle < -22.5:  return 'to-tr'
    return 'to-b'

print('helper ok')
