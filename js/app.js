var _puzzles = [
[
[8, 0, 0,   0, 0, 0,   0, 0, 0],
[0, 0, 0,   4, 0, 0,   6, 0, 2],
[0, 2, 1,   7, 0, 0,   0, 0, 0],
[0, 0, 0,   3, 0, 0,   0, 0, 0],
[0, 0, 6,   5, 0, 4,   0, 0, 0],
[9, 1, 3,   0, 0, 6,   0, 0, 7],
[2, 0, 0,   0, 0, 3,   5, 0, 0],
[0, 0, 4,   0, 9, 0,   8, 0, 6],
[0, 0, 0,   0, 0, 8,   0, 0, 0]
], [
[0, 0, 0,   0, 4, 0,   8, 0, 0],
[1, 0, 0,   0, 0, 0,   0, 2, 0],
[0, 8, 2,   0, 7, 0,   0, 0, 0],
[0, 1, 0,   8, 5, 0,   0, 0, 0],
[0, 0, 0,   0, 0, 4,   0, 3, 6],
[0, 0, 0,   0, 0, 0,   2, 0, 0],
[0, 7, 0,   5, 2, 0,   3, 0, 0],
[5, 0, 0,   3, 0, 0,   4, 8, 0],
[0, 0, 9,   0, 0, 1,   0, 0, 5]
], [
[0, 0, 6,   0, 0, 3,   2, 0, 0],
[0, 0, 0,   0, 8, 0,   0, 9, 0],
[3, 0, 8,   0, 4, 0,   0, 0, 0],
[0, 0, 0,   5, 0, 0,   0, 0, 0],
[0, 1, 5,   0, 0, 2,   0, 0, 8],
[0, 6, 7,   0, 0, 0,   1, 0, 3],
[0, 0, 0,   0, 7, 0,   0, 0, 9],
[1, 0, 0,   0, 0, 0,   4, 0, 0],
[0, 7, 0,   0, 1, 4,   0, 0, 0]
], [
[0, 9, 0,   5, 0, 0,   0, 0, 0],
[0, 0, 3,   7, 0, 0,   4, 0, 0],
[0, 7, 0,   0, 2, 0,   8, 6, 0],
[3, 0, 0,   0, 4, 0,   0, 0, 0],
[8, 0, 0,   0, 0, 0,   1, 7, 0],
[0, 0, 5,   0, 0, 0,   6, 0, 0],
[0, 8, 1,   0, 0, 9,   0, 2, 0],
[0, 5, 0,   0, 7, 6,   0, 0, 0],
[0, 0, 2,   0, 0, 0,   9, 0, 0]
]
];

newPuzzle();

calculateStats();

$('#new').click(function() {
    newPuzzle();
});

$('div.cell input').dblclick(function(e) {
    if (!$(this).hasClass('readonly')) {
        $(this).toggleClass('maybe');
        
        e.preventDefault();
    }
});


$(document).keydown(function(e){
    var _selectedCell = $('div.cell input:focus');
    
    if (_selectedCell.length) {
        if (e.keyCode == 46 || e.keyCode == 8) {
            if (_selectedCell.attr('readonly') !== 'readonly') {
                _selectedCell.val('').removeClass('maybe');
            }
            
            return;
        }
        
        var _selectedCellDivId = _selectedCell.parent('div').attr('id');
        
        var _x = getX(_selectedCellDivId);
        var _y = getY(_selectedCellDivId);
        
        if (e.keyCode == 37) {//left
            y = _y - 1;
            
            other = $('#cell_' + _x + '_' + y);
            
            if (other.length) {
                focusCell(other);
            }
        }
        
        if (e.keyCode == 38) {//up
            x = _x - 1;
            
            other = $('#cell_' + x + '_' + _y);
            
            if (other.length) {
                focusCell(other);
            }
        }
        
        if (e.keyCode == 39) {//right
            y = _y + 1;
            
            other = $('#cell_' + _x + '_' + y);
            
            if (other.length) {
                focusCell(other);
            }
        }
        
        if (e.keyCode == 40) {//down
            x = _x + 1;
            
            other = $('#cell_' + x + '_' + _y);
            
            if (other.length) {
                focusCell(other);
            }
        }
        
        if (!$(this).val().match(/[^\d]/)) {
            $(this).val('');
        }
    }
    
});

$('div.cell input').blur(function() {
    if (/^[0-9]+$/.test($(this).val()) === false) {
        $(this).val('');
    }
    
    calculateStats();
});

function getX(id) {
    coords = id.split('_');
    
    return coords[1] * 1;
}

function getY(id) {
    coords = id.split('_');
    
    return coords[2] * 1;
}

function focusCell(cell) {
    cell.children('input').focus();
}

function newPuzzle() {
    puzzle = _puzzles[Math.floor(Math.random()*_puzzles.length)];
    
    for (i = 0; i < 9; i++) {
        x = i + 1;
        for (j = 0; j < 9; j++) {
            y = j + 1;
            value = puzzle[i][j];
            
            if (value == 0) {
                $('#cell_' + x + '_' + y + ' input').val('')
                .attr('readonly', false)
                .removeClass('readonly');
            } else {
                $('#cell_' + x + '_' + y + ' input').val(value)
                .attr('readonly', true)
                .addClass('readonly');
            }
        }
    }   
}

function calculateStats() {
    stats = [0, 0, 0,   0, 0, 0,   0, 0, 0];
    
    for (i = 0; i < 9; i++) {
        x = i + 1;
        for (j = 0; j < 9; j++) {
            y = j + 1;
                
            stats[$('#cell_' + x + '_' + y + ' input').val() - 1]++;
        }
    }
    
    for (k = 0; k < 9; k++) {
        stat = k + 1;
        $('#stats_' + stat + ' span').html(stats[k]);
    }
}