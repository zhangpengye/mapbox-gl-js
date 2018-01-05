// @flow

const {
    Uniform1i,
    Uniform1f,
    Uniform2fv,
    UniformMatrix4fv,
    Uniforms
} = require('../uniform_binding');
const pixelsToTileUnits = require('../../source/pixels_to_tile_units');

import type Context from '../../gl/context';
import type Tile from '../../source/tile';
import type {UniformValues} from '../uniform_binding';

const heatmapUniforms = (context: Context) => {
    return new Uniforms({
        'u_extrude_scale': new Uniform1f(context),
        'u_intensity': new Uniform1f(context),
        'u_matrix': new UniformMatrix4fv(context)
    });
};

const heatmapTextureUniforms = (context: Context) => {
    return new Uniforms({
        'u_matrix': new UniformMatrix4fv(context),
        'u_world': new Uniform2fv(context),
        'u_image': new Uniform1i(context),
        'u_color_ramp': new Uniform1i(context),
        'u_opacity': new Uniform1f(context)
    });
};

function heatmapUniformValues(matrix: Float32Array, tile: Tile, zoom: number, intensity: number): UniformValues {
    return {
        'u_matrix': matrix,
        'u_extrude_scale': pixelsToTileUnits(tile, 1, zoom),
        'u_intensity': intensity
    };
}

function heatmapTextureUniformValues(matrix: Float32Array,
                                     drawingBufferSize: Array<number>,
                                     textureUnit: number,
                                     colorRampUnit: number,
                                     opacity: number): UniformValues {
    return {
        'u_matrix': matrix,
        'u_world': drawingBufferSize,
        'u_image': textureUnit,
        'u_color_ramp': colorRampUnit,
        'u_opacity': opacity
    };
}

module.exports = { heatmapUniforms, heatmapTextureUniforms, heatmapUniformValues, heatmapTextureUniformValues };
