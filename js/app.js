var _puzzles = [
    [
        [8, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 4, 0, 0, 6, 0, 2],
        [0, 2, 1, 7, 0, 0, 0, 0, 0],
        [0, 0, 0, 3, 0, 0, 0, 0, 0],
        [0, 0, 6, 5, 0, 4, 0, 0, 0],
        [9, 1, 3, 0, 0, 6, 0, 0, 7],
        [2, 0, 0, 0, 0, 3, 5, 0, 0],
        [0, 0, 4, 0, 9, 0, 8, 0, 6],
        [0, 0, 0, 0, 0, 8, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 4, 0, 8, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 2, 0],
        [0, 8, 2, 0, 7, 0, 0, 0, 0],
        [0, 1, 0, 8, 5, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 4, 0, 3, 6],
        [0, 0, 0, 0, 0, 0, 2, 0, 0],
        [0, 7, 0, 5, 2, 0, 3, 0, 0],
        [5, 0, 0, 3, 0, 0, 4, 8, 0],
        [0, 0, 9, 0, 0, 1, 0, 0, 5]
    ]
];

$('#new').click(function() {
    puzzle = _puzzles[Math.floor(Math.random()*_puzzles.length)];
    
    for (i = 0; i < 9; i++) {
        x = i + 1;
        for (j = 0; j < 9; j++) {
            y = j + 1;
            value = puzzle[i][j];
            
            $('#cell_' + x + '_' + y + ' input').val(value == 0 ? '' : value);
        }
    }
});


$(document).keydown(function(e){
    var _selectedCell = $('div.cell input[type=text]:focus');
    
    if (_selectedCell.length) {
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
    }
    if (e.keyCode >36 && e.keyCode < 41) {
        e.preventDefault();
    }
});


$('div.cell input').hoverIntent({
    over: function() {
        $(this).siblings('div').fadeIn(500);
    },
    out: function() {
        $(this).siblings('div').fadeOut(300);
    },
    timeout: 500
});

$('div.color').click(function() {
    $(this).siblings('input').addClass($(this).attr('rel'));
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
