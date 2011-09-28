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

var _solutions = [
    [
        [8, 4, 7,  9, 6, 2,  3, 1, 5],
        [3, 9, 5,  4, 8, 1,  6, 7, 2],
        [6, 2, 1,  7, 3, 5,  9, 8, 4],
        [4, 5, 2,  3, 7, 9,  1, 6, 8],
        [7, 8, 6,  5, 1, 4,  2, 3, 9],
        [9, 1, 3,  8, 2, 6,  4, 5, 7],
        [2, 7, 8,  6, 4, 3,  5, 9, 1],
        [5, 3, 4,  1, 9, 7,  8, 2, 6],
        [1, 6, 9,  2, 5, 8,  7, 4, 3]
    ]
];

var _puzzle = [];

var _stats = [0, 0, 0,   0, 0, 0,   0, 0, 0];

newPuzzle();

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

$('#save').click(function() {
    cookie = [];
    
    for (i = 0; i < 9; i++) {
        x = i + 1;
        for (j = 0; j < 9; j++) {
            y = j + 1;
            
            cookie.push($('#cell_' + x + '_' + y + ' input').val());
        }
    }
    
    $.cookie('sudoku', escape(cookie.join(',')));
});

$('#load').click(function() {
    serialized = unescape($.cookie('sudoku')).split(',');
    
    for (i = 0; i < 9; i++) {
        for (j = 0; j < 9; j++) {
            _puzzle[i][j] = serialized[9 * i + j];
        }
    }
    
    loadPuzzle();
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
    _puzzle = _puzzles[Math.floor(Math.random()*_puzzles.length)];
    
    loadPuzzle();
}

function loadPuzzle() {
    for (i = 0; i < 9; i++) {
        x = i + 1;
        for (j = 0; j < 9; j++) {
            y = j + 1;
            value = _puzzle[i][j];
            
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
    
    calculateStats();
}

function resetStats() {
    _stats = [0, 0, 0, 0, 0, 0, 0, 0, 0];
}

function calculateStats() {
    resetStats();
    
    for (i = 0; i < 9; i++) {
        x = i + 1;
        for (j = 0; j < 9; j++) {
            y = j + 1;
                
            _stats[$('#cell_' + x + '_' + y + ' input').val() - 1]++;
        }
    }
    
    for (k = 0; k < 9; k++) {
        stat = k + 1;
        $('#stats_' + stat + ' span').html(_stats[k]);
    }
}